import './styles/app.universal.css'
import Card from './components/card'

export default function projects(){
    return (
        <div className="app">
            <div className='cards'>
                <Card Title={'Ember Eagle'} image_path={'projects/ee.png'} description={'Ember Eagle: A simple social media site I started when I was 13 and finished when I was 16. Made with no framework for frontend and node js for backend'} link={'https://github.com/Dev-Avishka/EmberEagle/tree/main'}></Card>
                <Card Title={'Simple Project Creator'} image_path={'projects/spc.png'} description={'A simple console app that can create various project types made in python I made in order to learn python'} link={'https://github.com/Dev-Avishka/simple_project_creator'}></Card>
                <Card Title={'D4A'} image_path={'projects/d4a.png'} description={'D4A is an audio file format that uses another form of encoding instead of the traditional 16bit and has proven to be lighter as an MP3 file the size of 55 mb was 20 mb with no reduction in quality after being converted to D4A . The entire converter and player is written in Maven Java and is on github'} link={'https://github.com/Dev-Avishka/d4a'}></Card>
            </div>

        </div>
    )
}