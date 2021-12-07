import Picker from 'emoji-picker-react';
import './Emoji.scss';
function Emoji({ onEmojiClick, emojiMenu }) {
  return (
    <div id='emoji' className='emoji__wrapper' ref={emojiMenu}>
      <Picker
        onEmojiClick={onEmojiClick}
        disableSearchBar={true}
        disableSkinTonePicker={true}
      />
    </div>
  );
}

export default Emoji;
