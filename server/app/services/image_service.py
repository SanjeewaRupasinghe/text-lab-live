from pathlib import Path
import uuid
from PIL import Image
import os
from fastapi import HTTPException, UploadFile, status
from slugify import slugify

# Configurations
UPLOAD_DIR = "uploads/blogs"
ALLOWED_EXTENSIONS = {"webp"}
MAX_FILE_SIZE = 0.5 * 1024 * 1024  # 0.5MB
MAX_WIDTH = 2048
MAX_HEIGHT = 2048
MIN_WIDTH = 100
MIN_HEIGHT = 100


class ImageUploadService:
    @staticmethod
    def validate_file_extension(file: UploadFile) -> None:
        "Validate image file"

        # Extension should exists
        if not file.filename:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=[
                    {
                        "type": "value_error",
                        "msg": "No file selected",
                        "loc": ["body", "file"],
                        "input": {},
                    }
                ],
            )

        # Extension should allow
        file_extension = file.filename.split(".")[-1].lower()
        if file_extension not in ALLOWED_EXTENSIONS:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=[
                    {
                        "type": "value_error",
                        "msg": f"Invalid file type. Only {ALLOWED_EXTENSIONS} files are allowed",
                        "loc": ["body", "file"],
                        "input": {},
                    }
                ],
            )

    @staticmethod
    def validate_file_dimensions(image: Image.Image) -> None:
        """Validate image dimensions"""
        width, height = image.size

        # Minimum dimensions check
        if width < MIN_WIDTH or height < MIN_HEIGHT:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=[
                    {
                        "type": "value_error",
                        "msg": f"Image too small. Minimum size is {MIN_WIDTH}x{MIN_HEIGHT}px",
                        "loc": ["body", "file"],
                        "input": {},
                    }
                ],
            )

        # Maximum dimensions check
        if width > MAX_WIDTH or height > MAX_HEIGHT:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=[
                    {
                        "type": "value_error",
                        "msg": f"Image too large. Maximum size is {MAX_WIDTH}x{MAX_HEIGHT}px",
                        "loc": ["body", "file"],
                        "input": {},
                    }
                ],
            )

    @staticmethod
    async def validate_file_size(file: UploadFile) -> None:
        """Read and return the file content"""

        # Read file content
        content = await file.read()

        if len(content) > MAX_FILE_SIZE:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=[
                    {
                        "type": "value_error",
                        "msg": f"File too large. Maximum size is {MAX_FILE_SIZE} bytes",
                        "loc": ["body", "file"],
                        "input": {},
                    }
                ],
            )

    @staticmethod
    async def upload_image(file: UploadFile) -> str:
        """
        Upload and validate an image file.
        """

        # Validate file
        ImageUploadService.validate_file_extension(file=file)

        # Open and validate image dimensions
        image = Image.open(file.file)
        ImageUploadService.validate_file_dimensions(image=image)

        # File size validation
        await ImageUploadService.validate_file_size(file=file)

        # Create upload directory if it doesn't exist
        Path(UPLOAD_DIR).mkdir(parents=True, exist_ok=True)

        # File name
        file_ext = file.filename.split(".")[-1].lower()
        original_name = os.path.splitext(file.filename)[0]
        slugified_name = slugify(original_name)
        unique_filename = f"{slugified_name}-{uuid.uuid4().hex[:4]}.{file_ext}"
        file_path = os.path.join(UPLOAD_DIR, unique_filename)

        # Save file with compression
        try:
            image.save(file_path, "WEBP", quality=85, optimize=True)
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to save image: {str(e)}",
            )

        # return the filename for further processing
        return f"/{UPLOAD_DIR}/{unique_filename}"

    @staticmethod
    def delete_image(image_url: str) -> bool:
        """Delete an image file."""

        # Extract filename from URL
        filename = image_url.split("/")[-1]
        file_path = os.path.join(UPLOAD_DIR, filename)
        try:
            if os.path.exists(file_path):
                os.remove(file_path)
                return True
        except Exception as e:
            print(f"Error deleting image: {e}")

        return False
