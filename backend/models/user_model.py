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
        if User.query.filter_by(user_email=user_data.get('user_email')).first():
            raise ValueError("Email already exists.")

        new_user: User = User(**user_data)
        db.session.add(new_user)
        db.session.commit()
        return new_user

    @staticmethod
    def update_user(user_id: int, new_data: dict):
        user: User = User.query.get(user_id)

        if user:
            for key, value in new_data.items():
                setattr(user, key, value)
            db.session.commit()
        return user

    @staticmethod
    def get_all() -> list['User']:
        return User.query.all()