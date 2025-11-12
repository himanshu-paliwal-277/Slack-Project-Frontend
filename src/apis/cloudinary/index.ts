import axios from 'axios';

interface UploadImageToCloudinaryPresignedUrlParams {
  url: string;
  file: File;
}

export const uploadImageToCloudinaryPresignedUrl = async ({
  url,
  file,
}: UploadImageToCloudinaryPresignedUrlParams) => {
  try {
    const response = await axios.put(url, file, {
      headers: {
        'Content-Type': file.type,
      },
    });

    console.log('Response in uploading image to s3', response);
    return response;
  } catch (error) {
    console.log('Error in uploading image to s3', error);
  }
};
