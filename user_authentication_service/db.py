from sqlalchemy import 
from sqlalchemy.ext.declarative import 
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm.session import Session
from user import User, Base  
  
def add_user(self, email: str, hashed_password: str) -> User:
        """Add a user to the database

        Args:
            email (str): User's email
            hashed_password (str): User's hashed password

        Returns:
            User: User object added to the database
        """
        # Create a new User instance
        new_user = User(email=email, hashed_password=hashed_password)

        # Add the new user to the session and commit to save in the database
        self._session.add(new_user)
        self._session.commit()

        return new_user