import {useLocation , useNavigate} from 'react-router-dom';

export default function(){
    const navigate = useNavigate();
    const {state} = useLocation();

    if(!state?.pdf){
        return <p>PDF not found</p>
    }

    return(
        <div className='screen'>
            <button onClick={() => navigate(-1)}
                className='back-btn'>
                    🔙Back
            </button>

            <iframe src={state.pdf}
            title='PDF Viewer'
            width='100%'
            height='600px' 
            style={{border:'none'}}></iframe>
        </div>
    )
}