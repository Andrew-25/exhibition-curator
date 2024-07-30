import Nav from "./Nav";
import SearchForm from "./SearchForm";
import './css/Home.css'

const Home = () => {
    return (
        <div className="home">
          <Nav />
          <h1>Exhibition Curator</h1>
          <SearchForm />
        </div>
      );
}

export default Home