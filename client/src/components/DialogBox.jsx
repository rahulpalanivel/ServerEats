import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import styled from "styled-components";
import Button from "../components/Button";

const DialogBox = ({ isOpen, close, Confirm, Cancel, text }) => {
  const Container = styled.div``;

  return (
    <Container>
      <Dialog open={isOpen} onClose={close}>
        <DialogTitle>Confirm {text}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are You Sure You want to {text}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button text="Confirm" small onClick={Confirm}></Button>
          <Button text="Cancel" small onClick={Cancel}></Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DialogBox;
