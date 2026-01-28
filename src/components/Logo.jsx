import headerLogo from '../assets/header_logo.svg';
import footerLogo from '../assets/footer_logo.svg';

export default function Logo({width="100px", position}) {
    return (
        <div style={{width: width}} className='m-auto'>
            <img src={position === "header"? headerLogo : footerLogo } alt="Brand Logo"/>
        </div>
    );
}