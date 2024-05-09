import NavDropdown from 'react-bootstrap/NavDropdown';
import i18next from 'i18next';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

const Language = () => {
    const {i18n} = useTranslation()
    const handleChangeLanguage = (lang) => {
        i18n.changeLanguage(lang)
    }

    return (
        <>
            <NavDropdown title={i18n.language === "vi" ? "Tiếng việt" : "English"} id="basic-nav-dropdown2" className="languages">
                <NavDropdown.Item onClick={() => handleChangeLanguage("en")}>English</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleChangeLanguage("vi")}>Tiếng Việt</NavDropdown.Item>
            </NavDropdown>
        </>
    )
}

export default Language