import { useContext, useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";
import { red } from "@mui/material/colors";
import { useParams } from "react-router-dom";
import { loginContext } from "../../providers/UserContext";
import Cookies from "js-cookie";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export default function HoverRating({ user }) {
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);
  const params = useParams();
  const [currentUserCookie, setCurrentUserCookie] = useState(
    Cookies.get("userId")
  );
  const { currentUser } = useContext(loginContext);

  useEffect(() => {
    setCurrentUserCookie(Cookies.get("userId"));
  }, [currentUser, useParams()]);

  useEffect(() => {
    axios
      .get(
        `https://octopus-app-hzms7.ondigitalocean.app/reviews/${params.userId}`,
        {
          params: {
            id: params.userId,
          },
        }
      )
      .then((res) => {
        const sum = res.data.sum / 10;
        const count = res.data.count;
        const rating = sum / count;
        setValue(rating);
      });
  }, [user]);

  const handleClick = (newValue) => {
    axios
      .post(
        `https://octopus-app-hzms7.ondigitalocean.app/reviews/${params.userId}`,
        {
          params: {
            reviewedId: params.userId,
            reviewerId: currentUserCookie,
            rating: newValue * 10,
          },
        }
      )
      .then((res) => {
        const sum = res.data.sum / 10;
        const count = res.data.count;
        const rating = sum / count;
        setValue(rating);
      });
  };

  return (
    <Box
      sx={{
        width: 200,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
          handleClick(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
  );
}
