import logo from '../images/logotype.svg';

function Header() {
	return (
		<header className="header">
			<img src={logo} alt="Логотип" className="header__logotype" />
		</header>
	);
}

export default Header;
