interface ProgresBarProps {
    progress: number
}

function ProgressBar (props: ProgresBarProps) {
    return (
        <div className='h3 rounded-xl bg-zinc-700 w-full mt-4'>
            <div 
                role="progressbar"
                aria-label="Progresso de hábitos completados nese dia"
                aria-valuenow={props.progress}
                className='h-3 rounded-xl bg-violet-600'
                style={{width: `${props.progress}%`}}
            />
        </div>  
    );
}

export default ProgressBar;