from threading import Lock
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime, timedelta
from backend.utils.config import config
from backend.models.event_model import Event
from backend.models.user_model import User


class Housekeeper:
    _instance = None
    _lock = Lock()

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    cls._instance = super(Housekeeper, cls).__new__(cls)
                    cls._instance._initialized = False
        return cls._instance

    def __init__(self,
                 interval_seconds: int = None,
                 days_to_keep: int = None,
                 min_event_count: int = None):
        if self._initialized:
            return
        if not interval_seconds:
            interval_seconds = config.CLEANUP_INTERVAL_SECONDS
        if not days_to_keep:
            days_to_keep = config.DAYS_TO_KEEP
        if not min_event_count:
            min_event_count = config.MIN_EVENT_COUNT

        self.interval_seconds = interval_seconds
        self.days_to_keep = days_to_keep
        self.min_event_count = min_event_count

        self.scheduler = BackgroundScheduler()
        self.scheduler.add_job(self.cleanup_old_events, 'interval',
                               seconds=interval_seconds)
        self.scheduler.start()
        self._initialized = True

    def cleanup_old_events(self):
        cutoff_date = datetime.now() - timedelta(days=self.days_to_keep)
        Event.cleanup_events(cutoff_date, self.min_event_count)
        User.cleanup_users_without_events()
