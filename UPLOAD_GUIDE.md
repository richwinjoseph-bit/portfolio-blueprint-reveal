# Portfolio File Upload Guide

This guide explains how to upload and manage files (images, videos, and PDFs) for your portfolio website.

## Features

- Upload images, videos (MP4, WebM, MOV), and PDFs
- Organize files by category (Posters, Branding Identities, Illustrations, Magazine Designs, Other Projects)
- Automatic file management with Supabase Storage
- Public viewing, admin-only upload/delete

## Getting Started

### 1. Create an Admin Account

First, you need to create an admin account in Supabase:

1. Go to your Supabase Dashboard: https://app.supabase.com
2. Select your project
3. Navigate to **Authentication** → **Users**
4. Click **Add User** → **Create new user**
5. Enter your email and password
6. Click **Create User**

### 2. Login as Admin

1. On your portfolio website, click the **Admin Login** button in the top-right corner
2. Enter your admin email and password
3. Click **Login**

Once logged in, you'll see:
- A **Logout** button in the top-right corner
- A floating **Upload** button (+ icon) in the bottom-right corner

### 3. Upload Files

1. Click the **Upload** button (+ icon) in the bottom-right corner
2. Fill in the upload form:
   - **File**: Select your image, video, or PDF (max 50MB)
   - **Title**: Enter a descriptive title for your project
   - **Category**: Choose the appropriate category
   - **Description**: (Optional) Add a brief description
3. Click **Upload**

Your file will be uploaded and automatically displayed in the Projects section.

## Supported File Types

### Images
- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- WebP (.webp)

### Videos
- MP4 (.mp4)
- WebM (.webm)
- QuickTime (.mov)

Videos will auto-play on hover when viewing the portfolio.

### Documents
- PDF (.pdf)

PDFs will display with a document icon and can be opened in a new tab when clicked.

## Managing Files

### Viewing Files
- All uploaded files are automatically displayed in the Projects section
- Filter by category using the tabs at the top
- Click any file to view it in full size or download

### Deleting Files
1. Make sure you're logged in as admin
2. Hover over the file you want to delete
3. Click the red trash icon that appears in the top-right corner
4. Confirm the deletion

Files are permanently deleted from both the database and storage.

## File Organization

Files are automatically organized by:
1. **Category**: Chosen during upload
2. **Upload Date**: Newest files appear first within each category
3. **Order Index**: Can be customized in the database if needed

## Storage Details

- **Storage Bucket**: `portfolio-files`
- **File Size Limit**: 50MB per file
- **Public Access**: All uploaded files are publicly viewable
- **Security**: Only authenticated users can upload or delete files

## Troubleshooting

### Can't Upload Files
- Check that you're logged in as admin
- Verify file size is under 50MB
- Ensure file type is supported
- Check your internet connection

### Files Not Displaying
- Refresh the page
- Check the category filter
- Verify files were uploaded successfully in Supabase Storage

### Login Issues
- Double-check your email and password
- Ensure your admin account exists in Supabase Authentication
- Check browser console for error messages

## Tips

1. **Image Quality**: Use high-quality images for best results
2. **Video Format**: MP4 is recommended for best browser compatibility
3. **File Names**: Use descriptive file names for easier management
4. **Categories**: Be consistent with category selection for better organization
5. **Descriptions**: Add descriptions to provide context for each project

## Security Notes

- Never share your admin credentials
- Always logout when finished managing files
- Files are publicly accessible once uploaded
- Only upload content you want to be publicly visible
- Admin features are only visible when logged in

## Need Help?

If you encounter issues:
1. Check the browser console for error messages
2. Verify your Supabase project is properly configured
3. Ensure environment variables are set correctly
4. Check that the storage bucket `portfolio-files` exists and has proper policies
