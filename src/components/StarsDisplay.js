import utils from "../utility/utils";

const StarsDisplay = props => (
    <>
        {utils.range(1, props.stars).map(starId =>
          <div key={ starId} className="star" />
        )}
    </>
  );

export default StarsDisplay;