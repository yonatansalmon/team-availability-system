from db.init_db import db
from bson import ObjectId
import bcrypt


class User:
    def __init__(self, userName, email, password, status="Working"):
        self.userName = userName
        self.email = email
        self.password = password
        self.status = status

    def save(self):
        try:
            db.users.insert_one(vars(self))
        except Exception as e:
            print("Error saving user:", str(e))

    @classmethod
    def find_by_email(cls, email):
        try:
            return db.users.find_one({"email": email})
        except Exception as e:
            print("Error finding user by email:", str(e))
            return None

    @classmethod
    def find_by_userName(cls, userName):
        try:
            return db.users.find_one({"userName": userName})
        except Exception as e:
            print("Error finding user by username:", str(e))
            return None

    @classmethod
    def find_by_id(cls, _id):
        try:
            return db.users.find_one({"_id": ObjectId(_id)})
        except Exception as e:
            print("Error finding user by ID:", str(e))
            return None

    @classmethod
    def update_status(cls, userId, status):
        try:
            db.users.update_one({"_id": ObjectId(userId)}, {
                                "$set": {"status": status}})
        except Exception as e:
            print("Error updating user status:", str(e))

    @classmethod
    def get_all_users(cls):
        try:
            users = list(db.users.find())
            print(users)
            serialized_users = []
            for user in users:
                user['_id'] = str(user['_id'])
                serialized_users.append(user)
            print(serialized_users)
            return serialized_users
        except Exception as e:
            print("Error fetching all users:", str(e))
