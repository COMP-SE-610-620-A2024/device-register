from backend.utils.database_Init import db

class User(db.Model):
    __tablename__ = 'users'

    user_id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(100), nullable=False)
    user_email = db.Column(db.String(50), nullable=False, unique=True)

    def to_dict(self) -> dict[str, str]:
        return {
            'user_id': str(self.user_id),
            'user_name': self.user_name,
            'user_email': self.user_email
        }

    @staticmethod
    def add_user(user_data: dict) -> 'User':
        new_user = User(**user_data)
        db.session.add(new_user)
        db.session.commit()
        return new_user

    @staticmethod
    def update_user(user_id: int, new_data: dict) -> 'User':
        user = User.query.get(user_id)
        if user:
            for key, value in new_data.items():
                setattr(user, key, value)
            db.session.commit()
            return user

    @staticmethod
    def get_all() -> list['User']:
        return User.query.all()

    @staticmethod
    def find_user_by_email(email: str) -> int:
        user = User.query.filter_by(user_email=email).first()
        return user.user_id if user else None
