import Picker from 'emoji-picker-react';
import './Emoji.scss';
function Emoji({ onEmojiClick, handleParent }) {
  return (
    <div
      id='emoji'
      className='emoji__wrapper'
      onClick={() => handleParent(true)}>
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
