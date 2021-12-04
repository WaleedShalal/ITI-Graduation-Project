import Picker from 'emoji-picker-react';
import './Emoji.scss';
function Emoji({ onEmojiClick, handleGrandparent }) {
  return (
    <div
      id='emoji'
      className='emoji__wrapper'
      onClick={(e) => handleGrandparent(e)}>
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
