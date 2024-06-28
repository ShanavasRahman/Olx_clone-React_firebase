import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../store/Context';

function Header() {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const history = useHistory();

  const handleAuthAction = () => {
    if (user) {
      firebase.auth().signOut().then(() => {
        history.push("/login");
      }).catch((error) => {
        console.error("Error signing out: ", error);
      });
    } else {
      history.push("/login");
    }
  };

  const handleSell = () => {
    history.push("/create");
  };

  const handleLogoClick = () => {
    history.push("/");
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          <OlxLogo />
        </div>
        <div className="placeSearch">
          <Search />
          <input type="text" />
          <Arrow />
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car, mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff" />
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow />
        </div>
        <div className="loginPage">
          <span onClick={handleAuthAction}>
            {user ? `${user.displayName}` : 'Login'}
          </span>
          <hr />
        </div>
        {user && <span onClick={handleAuthAction}>Logout</span>}
        <div className="sellMenu" onClick={handleSell}>
          <SellButton />
          <div className="sellMenuContent">
            <SellButtonPlus />
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
