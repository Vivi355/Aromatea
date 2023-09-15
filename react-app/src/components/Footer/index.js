import './Footer.css'

export const Footer = () => {
    const creator = {name: "Vivian Li", github: "https://github.com/Vivi355", linkedin: "https://www.linkedin.com/in/liqin-li-880646144/"};

    return (
        <>
            <div id="creator">
                <div className='copy-right'>
                    <i className="far fa-copyright"></i>2023 Aromatea. All Rights Reserved
                </div>
                <div className='contact'>
                    <a href={creator.github}>
                        <i className='fab fa-github'></i>
                    </a>
                    <a href={creator.linkedin}>
                        <i className="fab fa-linkedin"></i>
                    </a>
                </div>

            </div>
        </>
    )
}
