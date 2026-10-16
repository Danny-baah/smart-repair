import cv2
from PIL import Image
import os
import numpy as np

def extract_frames(video_path, output_dir, target_count=160, quality=82):
    os.makedirs(output_dir, exist_ok=True)
    
    cap = cv2.VideoCapture(video_path)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    
    print(f"Opening video: {video_path}")
    print(f"Original specs: {width}x{height}, {fps:.2f} fps, {total_frames} frames ({total_frames/fps:.2f}s)")
    
    # Find last valid frame
    last_valid = total_frames - 1
    while last_valid > 0:
        cap.set(cv2.CAP_PROP_POS_FRAMES, last_valid)
        ret, _ = cap.read()
        if ret:
            break
        last_valid -= 1
        
    print(f"Last valid frame index: {last_valid}")
    
    # Calculate sample indices evenly spaced from 0 to last_valid
    sample_indices = np.linspace(0, last_valid, target_count, dtype=int)
    # Deduplicate while preserving order if any
    sample_indices = sorted(list(set(sample_indices)))
    
    print(f"Extracting {len(sample_indices)} frames into {output_dir}...")
    
    extracted = 0
    total_size = 0
    
    for i, frame_idx in enumerate(sample_indices):
        cap.set(cv2.CAP_PROP_POS_FRAMES, frame_idx)
        ret, frame = cap.read()
        if not ret:
            print(f"Warning: could not read frame {frame_idx}")
            continue
            
        # Convert BGR to RGB
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        img = Image.fromarray(rgb_frame)
        
        # Save as optimized WebP
        filename = f"frame_{i+1:04d}.webp"
        filepath = os.path.join(output_dir, filename)
        img.save(filepath, "WEBP", quality=quality, method=4)
        
        sz = os.path.getsize(filepath)
        total_size += sz
        extracted += 1
        
        if (i + 1) % 20 == 0 or (i + 1) == len(sample_indices):
            print(f"Extracted {i+1}/{len(sample_indices)} frames ({filename}, {sz//1024} KB)")
            
    cap.release()
    print(f"Done! Successfully extracted {extracted} frames.")
    print(f"Total size: {total_size / (1024*1024):.2f} MB (average {total_size/extracted/1024:.1f} KB/frame)")

if __name__ == "__main__":
    extract_frames(
        video_path="video_2026-10-16_14-39-31.mp4",
        output_dir="public/frames",
        target_count=160,
        quality=82
    )
