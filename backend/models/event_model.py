from backend.setup.database_Init import db
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import selectinload, joinedload, validates


class Event(db.Model):
    __tablename__: str = 'events'

    @validates('loc_name', 'company', 'comment')
    def validate_length(self, key, data):
        max_lengths = {
            'loc_name': 100,
            'company': 100,
            'comment': 500,
        }
        if len(data) > max_lengths[key]:
            return data[:max_lengths[key]]
        return data


    event_id = db.Column(db.Integer, primary_key=True)
    dev_id = db.Column(db.Integer, db.ForeignKey('devices.dev_id', ondelete='CASCADE'),
                       nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id', ondelete='CASCADE'),
                        nullable=False)
    move_time = db.Column(db.DateTime, nullable=False)
    loc_name = db.Column(db.String, nullable=False)
    company = db.Column(db.String, nullable=False)
    comment = db.Column(db.String, nullable=False)

    def to_dict(self) -> dict[str, str]:
        return {
            'event_id': str(self.event_id),
            'dev_id': str(self.dev_id),
            'user_id': str(self.user_id),
            'move_time': self.move_time.isoformat() if self.move_time else None,
            'loc_name': self.loc_name,
            'company': self.company,
            'comment': self.comment
        }

    @staticmethod
    def get_all_events() -> list['Event']:
        return Event.query.options(selectinload(Event.user),
                                   joinedload(Event.device)).all()

    @staticmethod
    def get_event_by_id(event_id: int) -> 'Event':
        return (Event.query.options(selectinload(Event.user))
                .filter_by(event_id=event_id)
                .first())

    @staticmethod
    def create_event(event_list: list['Event']) -> tuple['bool', 'str']:
        try:
            db.session.add_all(event_list)
            db.session.commit()

        except SQLAlchemyError as error:
            print(error)
            db.session.rollback()
            return False, str(error)

        return True, ""

    @staticmethod
    def update_event() -> tuple['bool', 'str']:
        try:
            db.session.commit()
        except SQLAlchemyError as error:
            db.session.rollback()
            return False, str(error)

        return True, ""

    @staticmethod
    def remove_event(event_id: int) -> 'bool':
        event = Event.get_event_by_id(event_id)

        if event:
            db.session.delete(event)
            db.session.commit()
            return True
        else:
            return False
