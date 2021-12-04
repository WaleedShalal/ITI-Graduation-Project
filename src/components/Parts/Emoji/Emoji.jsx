import Picker from 'emoji-picker-react';
import './Emoji.scss';
function Emoji({ onEmojiClick }) {
  return (
    <div id='emoji' className='active'>
      <Picker
        onEmojiClick={onEmojiClick}
        // preload={false}
        disableSearchBar={true}
        disableSkinTonePicker={true}
      />
    </div>
  );
}

export default Emoji;
