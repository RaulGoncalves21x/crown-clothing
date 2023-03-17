import "./category-item.style.scss";

const CategoryItem = ({ category }) => {
  const {imageUrl, title} = category;
  return (
    <div className="category-item">
      <div className="background-image" style={{
        backgroundImage: `url(${imageUrl})`,
      }}/>
      <div className="info">
        <h2>{title}</h2>
        <p>shop now</p>
      </div>
    </div>
  );
};

export default CategoryItem