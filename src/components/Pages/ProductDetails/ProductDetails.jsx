
import  "./ProductDetails.scss"; 

function ProductDetails() {
  return (
    <section className="section product-detail">
    <div className="container">
      <div className="row">
        <div className="details container-md">
          <div className="left-side">
            <figure className="product-image">
              <img src='http://placehold.it/150' alt="product" />
            </figure>
          </div>
          <div className="right-side">
            <span>Product Category</span>
            <h1>Product Title</h1>
            <div className="price">$250</div> 
            <h3>Product Detail</h3>
            <p>lorem Ips sit amet, consectetur adipiscing el cursus</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}

export default ProductDetails;
