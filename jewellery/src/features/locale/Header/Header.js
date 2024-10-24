import { changeLanguage } from "i18next";
import usa from "../../../assets/flags/usaflag.jpg"
import ru from "../../../assets/flags/russflag.jpg";

function Header({ visible }) {
    const languages = [
      
        {
            id: Math.random(),
            slug: 'En',
            title: 'En',
            img: usa
        },
        {
            id: Math.random(),
            slug: 'Ru',
            title: 'Ru',
            img: ru
        }
    ];

    if (!visible) {
        return null;
    }

    return (
        <ul style={{ listStyleType: "none", backgroundColor:"#2A2C33", padding:"5px" }}>
            {languages.map((language) => (
                <li key={language.id} onClick={() => {
                    changeLanguage(language.slug);
                    localStorage.setItem('language', language.slug);
                }}>
                    <img
                        src={language.img}
                        style={{
                            width: '20px',
                            height: "13px",
                            marginBottom: "0px",
                            marginTop: "5px",
                            cursor: 'pointer',
                            
                        }}
                    />
                </li>
            ))}
        </ul>
    );
}

export default Header;
