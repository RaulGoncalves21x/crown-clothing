import {BackgroundImage, DirectoryItemBody, DirectoryItemContainer} from "./directory-item.style";

const DirectoryItem = ({ category }) => {
  const {imageUrl, title} = category;
  return (
    <DirectoryItemContainer>
      <BackgroundImage imageUrl={imageUrl}/>
      <DirectoryItemBody>
        <h2>{title}</h2>
        <p>shop now</p>
      </DirectoryItemBody>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;