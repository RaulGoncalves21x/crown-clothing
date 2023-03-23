import { ErrorDiv, SuggestionsDiv } from "../category-page/category-page.style";

const ErrorPage = () => (
  <>
    <ErrorDiv>
      <h1>Oops!</h1>
      <p>It looks like the page you are looking isn't available.</p>
    </ErrorDiv>
    <SuggestionsDiv>
      <h2>You can try these pages:</h2>
      <div>
        <a href="/">Home</a>
        <a href="/shop">Shop</a>
        <a href="/checkout">Checkout</a>
        <a href="/auth">Authentication</a>
      </div>
    </SuggestionsDiv>
  </>
);

export default ErrorPage;