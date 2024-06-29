import os
import whisper
import ssl

ssl._create_default_https_context = ssl._create_unverified_context

model = whisper.load_model("base")

audio_dir = "audio_data"
output_dir = "transcriptions"

os.makedirs(output_dir, exist_ok=True)

for audio_file in os.listdir(audio_dir):

    audio_path = os.path.join(audio_dir, audio_file)
    
    if audio_file.lower().endswith(('.wav')):
        print(f"Transcribing {audio_file}...")
        
        result = model.transcribe(audio_path)
        transcription = result['text']
        
        output_file = os.path.splitext(audio_file)[0] + ".txt"
        output_path = os.path.join(output_dir, output_file)
        
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(transcription)
        
        print(f"Saved transcription to {output_file}")
