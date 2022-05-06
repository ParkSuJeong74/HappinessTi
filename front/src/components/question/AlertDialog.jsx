import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from "@mui/material";
import style from '../../srcAssets/style/Question.module.css'
import happySmile from '../../srcAssets/img/dialog/happySmile.gif'
import balloon from '../../srcAssets/img/dialog/balloon.jpg'
import num1 from '../../srcAssets/img/dialog/dialog_1.jpg'
import num2 from '../../srcAssets/img/dialog/dialog_2.jpg'
import num3 from '../../srcAssets/img/dialog/dialog_3.jpg'
import num4 from '../../srcAssets/img/dialog/dialog_4.jpg'
import num5 from '../../srcAssets/img/dialog/dialog_5.jpg'
import num6 from '../../srcAssets/img/dialog/dialog_6.png'

export default function AlertDialog({modalOpen, setModalOpen}) {
  
    const modalClose = () => {
      setModalOpen(false);
    };
  
    return (
        <Dialog
            fullWidth={true}
            maxWidth="md"
            open={modalOpen}
            onClose={modalClose}
        >
          <DialogTitle >
            <h1 className={style.dialogTitle}>설문조사 전 안내사항입니다!</h1>
          </DialogTitle>

          {/* dialog 안의 내용 */}
          <DialogContent>
            <Stack direction="row">
                <img width="40px" height="40px"src={num1} alt="숫자 1" />
                <h2 className={style.dialogText}>총 검사 시간은 <span class={style.highlight}>10분 내외</span>입니다.</h2>
            </Stack>

            <Stack direction="row">
                <img width="40px" height="40px"src={num2} alt="숫자 2" />
                <h2 className={style.dialogText}>가능하면 답변 시 <span class={style.highlight}>중립</span>을 선택하지 마십시오.</h2>
            </Stack>

            <Stack direction="row">
                <img width="40px" height="40px"src={num3} alt="숫자 3" />
                <h2 className={style.dialogText}>혹 질문이 마음에 들지 않더라도 <span class={style.highlight}>정직하게 답변</span>하십시오.</h2>
            </Stack>

            <Stack direction="row">
                <img width="40px" height="40px"src={num4} alt="숫자 4" />
                <h2 className={style.dialogText}><span class={style.highlight}>새로고침</span>을 하지 마십시오.</h2>
            </Stack>

            <Stack direction="row">
                <img width="40px" height="40px"src={num5} alt="숫자 5" />
                <h2 className={style.dialogText}>이 검사는 kaggle 데이터를 기반으로 만든 독자적인 설문조사입니다. <span class={style.highlight}>재미로만</span> 이용해주세요.</h2>
            </Stack>

            <Stack direction="row">
                <img width="40px" height="45px"src={num6} alt="숫자 6" />
                <h2 className={style.dialogText}><span class={style.highlight}>로그인</span>을 하지 않으신다면 HAPPY-TI의 결과를 보실 수 없습니다.</h2>
            </Stack>
            
            <br />

            <Stack direction="row">
                <img width="300px" height="300px" src={happySmile} alt="나무늘보가 웃어" />
                <img width="450px" height="300px" src={balloon} alt="말풍선"/>
                <h1 className={style.agreeText}>동의하시겠습니까?</h1>
            </Stack>
          </DialogContent>

          <DialogActions>
            <Button color="secondary" sx={{fontSize: '1.5rem'}} onClick={modalClose} autoFocus>
              AGREE
            </Button>
          </DialogActions>
        </Dialog>

    );
  }
  
