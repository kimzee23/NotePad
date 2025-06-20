# exceptions/invalid_input_exception.py
class InvalidInputException(Exception):
    def __init__(self, message="Invalid input provided"):
        self.message = message
        super().__init__(self.message)
