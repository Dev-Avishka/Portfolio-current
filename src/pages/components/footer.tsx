import './styles/footer.css'

export default function Footer(){
    return(
        <div className='footer'>
            <a href='https://www.youtube.com/@devavishka' rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} target="_blank" >
                <img src='youtube.png' alt='youtube' />
            </a>
            <a href='https://www.instagram.com/dev_avishka/' rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} target="_blank" className='insta'>
                <img src='instagram.png' alt='insta' />
            </a>
            <a href='https://x.com/Dev_Avishka' rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} target="_blank" className='insta'>
                <img src='twitter.png' alt='x' />
            </a>
            <a href='https://github.com/Dev-Avishka' rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} target="_blank" className='insta'>
                <img src='github.png' alt='github' />
            </a>
        </div>
    )
}