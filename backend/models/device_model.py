from backend.utils.database_Init import db
from sqlalchemy.exc import SQLAlchemyError


class Device(db.Model):
    __tablename__ = 'devices'

    dev_id = db.Column(db.Integer, primary_key=True)
    dev_name = db.Column(db.String(100), nullable=False)
    dev_manufacturer = db.Column(db.String(50), nullable=False)
    dev_model = db.Column(db.String(50), nullable=False)
    dev_class = db.Column(db.String(50), nullable=False)
    dev_comments = db.Column(db.String(200), nullable=False)

    def to_dict(self) -> dict[str, str]:
        return {
            'dev_id': str(self.dev_id),
            'dev_name': self.dev_name,
            'dev_manufacturer': self.dev_manufacturer,
            'dev_model': self.dev_model,
            'dev_class': self.dev_class,
            'dev_comments': self.dev_comments
        }

    @staticmethod
    def get_all() -> list['Device']:
        return Device.query.all()

    @staticmethod
    def create_devices(device_list: list['Device']) -> tuple['bool', 'str']:
        try:
            for new_device in device_list:
                db.session.add(new_device)

            db.session.commit()

        except SQLAlchemyError as error:
            db.session.rollback()
            return False, str(error)

        return True, ""
      
    @staticmethod
    def get_device_by_id(dev_id: int) -> 'Device':
        return db.session.get(Device, dev_id)
