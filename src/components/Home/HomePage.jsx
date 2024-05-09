import { useSelector } from 'react-redux';
import videoHomePage from '../../assets/video-homepage.mp4';
import { useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';

const HomePage = () => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const navigate = useNavigate()
    const { t } = useTranslation()

    return (
        <div className="homepage-container">
            <video autoPlay muted loop>
                <source src={videoHomePage} type="video/mp4" />
            </video>
            <div className="homepage-content">
                <div className="title-1">{t("homepage.title1")}</div>
                <div className="title-2">
                    <Trans i18nKey="homepage.title2" components={{ 1: <br /> }} />
                </div>
                <div className="title-3">
                    {isAuthenticated ?
                        <button onClick={() => navigate("/user")}>
                            {t("homepage.takeQuizBtn")}
                        </button>
                        :
                        <button onClick={() => navigate("/login")}>
                            {t("homepage.getStartedBtn")}
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}

export default HomePage;