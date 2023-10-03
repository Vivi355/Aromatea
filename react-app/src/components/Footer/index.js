import './Footer.css'

export const Footer = () => {
    const creator = {name: "Vivian Li", github: "https://github.com/Vivi355", linkedin: "https://www.linkedin.com/in/vivian-liqin-li/"};

    return (
        <>
            <div id="creator">
                <div className='copy-right'>
                    <i className="far fa-copyright"></i>2023 Aromatea. All Rights Reserved
                </div>
                <div className='contact'>
                    <a href={creator.github} target='_blank'>
                        <i className='fab fa-github'></i>
                    </a>
                    <a href={creator.linkedin} target='_blank'>
                        <i className="fab fa-linkedin"></i>
                    </a>
                </div>

            </div>
        </>
    )
}
