import { FunctionComponent } from "react";

interface SpinnerProps {

}

const Spinner: FunctionComponent<SpinnerProps> = () => {
    return (
        <>
            <div className="d-flex justify-content-center mt-3" >
                <p className="fw-bold" >No comments Yet</p>
            </div>
        </>
    );
}

export default Spinner;