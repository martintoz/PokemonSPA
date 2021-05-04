import FooterCss from './Footer.module.css'

function Footer() {
    return (
        <div className={FooterCss.footer}>
            <p>Hecho por <a href="https://github.com/martintoz" rel="noreferrer" target="_blank">Martín Tozer</a> para <a href='https://www.soyhenry.com/' rel="noreferrer" target="_blank">Henry 
🚀</a></p>
        </div>
    )
};

export default Footer;