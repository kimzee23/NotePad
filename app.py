from flask import Flask, render_template, session
from flask_cors import CORS
from flask_pymongo import PyMongo
from dotenv import load_dotenv
import os

# Load environment variables (if .env file exists)
load_dotenv()

mongo = PyMongo()


def create_app():
    app = Flask(__name__)

    # Configuration
    app.config["MONGO_URI"] = os.getenv("MONGO_URI", "mongodb://localhost:27017/notepad_db")
    app.secret_key = os.getenv("SECRET_KEY", "super-secret-key")
    CORS(app)
    mongo.init_app(app)

    # Register Blueprints
    from routes.auth_routes import auth_bp
    from routes.note_routes import note_bp

    app.register_blueprint(auth_bp, url_prefix="/api/v1/auth")
    app.register_blueprint(note_bp, url_prefix="/api/v1/notes")


    # Routes for frontend pages
    @app.route('/')
    def landing():
        return render_template('landing.html')

    @app.route('/register')
    def register():
        return render_template('register.html')

    @app.route('/login')
    def login():
        return render_template('login.html')

    @app.route('/dashboard')
    def dashboard():
        if 'user_id' not in session:
            return render_template('login.html')
        return render_template('dashboard.html')

    return app


# Run the app
if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
