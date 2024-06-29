import os
import whisper
import ssl

ssl._create_default_https_context = ssl._create_unverified_context

model = whisper.load_model("base")


def generate_audio(audio_file, output_file):
    '''
        Generate the audio from the audio file
        INPUTS:
        audio_path: str: Path to the audio file
        OUTPUT:
        audio: np.array: The audio of the audio file
    '''
    if audio_file.lower().endswith(('.wav')):
        
        result = model.transcribe(audio_file)
        transcription = result['text']
        
        output_file = os.path.splitext(audio_file)[0] + ".txt"
        
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(transcription)
        
        
    
