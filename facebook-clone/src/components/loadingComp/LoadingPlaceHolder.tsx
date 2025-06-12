import { FunctionComponent } from "react";

interface LoadingPlaceHolderProps {

}

const LoadingPlaceHolder: FunctionComponent<LoadingPlaceHolderProps> = () => {
    return (
        <>
            <div className="card cardContainer d-flex flex-column mb-3" aria-hidden="true" style={{ height: "auto" }}>
                <div className="card-body p-0">
                    <div className="cardOwner d-flex">
                        <span className="placeholder rounded-circle" style={{ width: "40px", height: "40px" }}></span>
                        <div className="nameAndDate d-flex flex-column mx-2">
                            <h5 className="fs-6 m-0 placeholder-glow">
                                <span className="placeholder col-6"></span>
                            </h5>
                            <span className="placeholder col-4"></span>
                        </div>
                    </div>
                    <p className="m-0 placeholder-glow">
                        <span className="placeholder col-10"></span>
                        <span className="placeholder col-8"></span>
                    </p>
                    <div className="postImage placeholder-glow">
                        <div className="placeholder w-100" style={{ height: "200px", maxHeight: "200px" }}></div>
                    </div>
                    <div className="likeAndCommentCount d-flex justify-content-between mt-2">
                        <span className="placeholder col-2"></span>
                        <span className="placeholder col-2"></span>
                    </div>
                    <hr className="m-0" />
                    <div className="likeAndComment d-flex justify-content-around">
                        <p className="m-0 p-0 placeholder col-2"></p>
                        <p className="m-0 p-0 placeholder col-2"></p>
                        <p className="m-0 p-0 placeholder col-2"></p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoadingPlaceHolder;