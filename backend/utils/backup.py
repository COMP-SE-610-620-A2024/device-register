import os
import shutil
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.schedulers.base import STATE_STOPPED
from datetime import datetime
from threading import Lock

from backend.utils.config import config


class Backup:
    _instance = None
    _lock = Lock()

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    cls._instance = super(Backup, cls).__new__(cls)
                    cls._instance._initialized = False
        return cls._instance

    def __init__(self, interval_seconds: int = None, max_backups: int = None):
        if self._initialized:
            return

        if not interval_seconds or interval_seconds <= 0:
            raise ValueError("Interval seconds must be a positive integer.")
        if not max_backups or max_backups <= 0:
            raise ValueError("Max backups must be a positive integer.")

        self.interval_seconds = interval_seconds
        self.max_backups = max_backups
        self.db_path = os.path.join(config.PROJECT_ROOT, "instance", "database.db")
        self.backup_dir = os.path.join(config.PROJECT_ROOT, "instance", "backup")

        # Ensure backup directory exists
        try:
            os.makedirs(self.backup_dir, exist_ok=True)
        except OSError as e:
            print(f"Error: Failed to create backup directory: {e}")
            raise

        self.scheduler = BackgroundScheduler()
        self.scheduler.add_job(self.backup_db, 'interval', seconds=self.interval_seconds)
        self.scheduler.start()
        self._initialized = True
        print("Backup system initialized and scheduler started.")

    def backup_db(self):
        if not os.path.exists(self.db_path):
            print(f"Error: No database found at {self.db_path}. Backup aborted.")
            return

        timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
        backup_db_path = os.path.join(self.backup_dir, f"database_{timestamp}.bak")

        try:
            shutil.copy2(self.db_path, backup_db_path)
            print(f"Backup created: {backup_db_path}")
        except Exception as e:
            print(f"Error: Failed to create backup: {e}")
            return

        self.cleanup_old_backups()

    def cleanup_old_backups(self):
        try:
            backups = sorted(
                (f for f in os.listdir(self.backup_dir) if f.startswith("database_")),
                key=lambda f: os.path.getmtime(os.path.join(self.backup_dir, f))
            )
            for backup in backups[:-self.max_backups]:
                os.remove(os.path.join(self.backup_dir, backup))
                print(f"Removed old backup: {backup}")
        except Exception as e:
            print(f"Error: Failed to clean up old backups: {e}")

    def stop_scheduler(self):
        if self.scheduler.state != STATE_STOPPED:
            self.scheduler.shutdown(wait=False)
            print("Backup scheduler stopped.")
