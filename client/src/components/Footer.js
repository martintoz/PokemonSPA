import FooterCss from './Footer.module.css'

function Footer() {
    return (
        <div className={FooterCss.footer}>
            <p>Made by <a href="https://github.com/martintoz" rel="noreferrer" target="_blank">Martin Tozer</a> for <a href='https://www.soyhenry.com/' rel="noreferrer" target="_blank">Henry 
🚀</a></p>
        </div>
    )
};

export default Footer;