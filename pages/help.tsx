import React from 'react';
import { Box, Paper, Typography, Container, Grid, CardMedia } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import resourceImg from '@src/static/img/resource.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(12),
      fontFamily: 'Prompt',
    },
    imgCover: {
      height: '100%',
      objectFit: 'cover',
    },
    imgRound: {
      borderRadius: 40,
      height: '100%',
      cursor: 'pointer',
    },
    cardBorder: {
      border: '2px solid #c7c4c4',
      borderRadius: 40,
    },
    appBar: {
      position: 'relative',
    },
    text: {
      fontFamily: 'Prompt',
    },
  })
);
const HelpPage: React.FC = () => {
  const classStyle = useStyles();
  return (
    <Paper className={classStyle.paper} sx={{ pb: 4 }}>
      <Container maxWidth="md">
        <Box sx={{ mt: 14 }} />
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography variant="h6" className={classStyle.text}>
              ขอความช่วยเหลือ
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className={classStyle.text}>
              วิธีดูข้อมูลเพิ่มเติมเกี่ยวกับห้องพัก บริการและสิ่งอำนวยความสะดวกของที่พัก
            </Typography>
            <Typography className={classStyle.text}>เมื่อไหร่จึงจะได้รับใบยืนยันการจอง</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className={classStyle.text}>รายละเอียดการจอง</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className={classStyle.text}>วิธีตรวจสอบข้อมูลการจองและสถานะการจอง</Typography>
            <Typography className={classStyle.text}>มายสเตย์สามารถส่งใบยืนยันการจองให้อีกครั้งได้หรือไม่</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className={classStyle.text}>ยกเลิกการจอง</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className={classStyle.text}>เพิ่มเตียงเสริมหรือเตียงเด็กในห้องได้หรือไม่</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className={classStyle.text}>เปลี่ยนแปลงการจอง</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className={classStyle.text}>ราคาห้องพักรวมอาหารเช้าหรือไม่</Typography>
            <Typography className={classStyle.text}>ที่พักมีบริการรับส่งสนามบินหรือไม่</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className={classStyle.text}>ขอรับบริการเพิ่ม</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className={classStyle.text}>เลือกประเภทเตียงได้หรือไม่</Typography>
            <Typography className={classStyle.text}>
              ไม่ได้รับใบยืนยันการจองและไม่พบข้อมูลการจองบนช่องทางออนไลน์
            </Typography>
            <Typography className={classStyle.text}>ต้องการเคลม “การรับประกันราคาดีที่สุด”</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={3} mt={4}>
          <Grid item xs={12}>
            <Typography variant="h6" className={classStyle.text}>
              เป็นพาร์ทเนอร์กับเรา
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classStyle.text} fontWeight="bold">
              ก่อนที่จะนำรีสอร์ทมาเข้าร่วม Mindstay ฉันควรพิจารณาเรื่องกฏหมาย ภาษี หรือข้อกำหนดใดบ้าง
            </Typography>
            <Box my={2} />
            <Typography className={classStyle.text}>
              เมื่อตัดสินใจได้แล้วว่าจะมาเป็นเจ้าของที่พัก Mindstay คุณต้องเข้าใจด้วยว่ากฏหมายในเมืองของคุณเป็นอย่างไร
            </Typography>
            <Box my={2} />
            <Typography className={classStyle.text}>
              บางเมืองมีกฏหมายที่ห้ามไม่ให้เจ้าของที่พักรับจองระยะสั้น
              กฏหมายเหล่านี้มักเป็นส่วนหนึ่งของการจัดระเบียบหรือการบริหารเมือง ในหลายๆ เมือง คุณจะต้องจดทะเบียน ขออนุญาต
              หรือขอใบอนุญาตก่อน จึงจะลงประกาศที่พักหรือรับผู้เข้าพักได้
              การให้เช่าที่พักระยะสั้นบางประเภทอาจถูกห้ามไม่ให้ดำเนินการเลย
              การบังคับใช้กฎหมายเหล่านี้ในแต่ละท้องถิ่นอาจแตกต่างกันมาก บทลงโทษอาจเป็นค่าปรับหรือการบังคับใช้กฏหมายอื่นๆ
            </Typography>
            <Box my={2} />
            <Typography className={classStyle.text}>
              กฎเหล่านี้อาจทำให้สับสนได้เหมือนกัน เรากำลังร่วมมือกับหน่วยงานรัฐบาลทั่วโลก
              เพื่อขอความชัดเจนเกี่ยวกับกฎระเบียบเหล่านี้ เพื่อให้ทุกคนเข้าใจอย่างชัดเจนว่ามีกฏหมายอะไรบ้าง
            </Typography>
            <Box my={2} />
            <Typography className={classStyle.text}>
              ในเขตพื้นที่ภาษีบางแห่ง Airbnb จะคำนวณ จัดเก็บ และนำส่งภาษีการเข้าพักในนามของคุณให้
              ภาษีการเข้าพักในแต่ละเขตอำนาจศาลก็คำนวณไม่เหมือนกัน
              เรากำลังเร่งมือโดยเร็วที่สุดเพื่อขยายสิทธิประโยชน์นี้ให้เจ้าของที่พักทั่วโลกมาก
            </Typography>
            <Box my={2} />
            <Typography className={classStyle.text}>
              ระหว่างนี้ ก็ศึกษากฏหมายท้องถิ่นไปก่อนลงประกาศที่พักใน Mindstay
              ข้อมูลเพิ่มเติมเกี่ยวกับกฏหมายและระเบียบข้อบังคับของเมืองของคุณอาจอยู่ใน
              <Typography component="ins" className={classStyle.text}>
                หน้าการให้เช่าที่พักอย่างมีความรับผิดชอบ
              </Typography>
              ในส่วน
              <Typography component="span" fontWeight="bold" className={classStyle.text}>
                ระเบียบข้อบังคับของเมืองคุณ
              </Typography>
            </Typography>
            <Box my={2} />
            <Typography className={classStyle.text}>
              การยอมรับ
              <Typography component="ins" className={classStyle.text}>
                เงื่อนไขการให้บริการ
              </Typography>
              และเปิดใช้งานที่พัก เป็นการยืนยันว่าคุณจะปฏิบัติตามกฏหมายและระเบียบข้อบังคับในเมืองของคุณ
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={3} mt={4}>
          <Grid item xs={12}>
            <Typography variant="h6" className={classStyle.text}>
              มาตรการ COVID 19
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classStyle.text} fontWeight="bold">
              5 ขั้นตอนการทำความสะอาดแบบพิเศษของ Mindstay
            </Typography>
            <Typography className={classStyle.text}>
              ชุดแนวปฏิบัติการทำความสะอาดที่เจ้าของที่พักทุกคนต้องปฏิบัติตามหลังการเช็คเอาท์ทุกครั้ง
              นอกเหนือจากข้อกฎหมายและคำแนะนำจากหน่วยงานท้องถิ่น
            </Typography>
            <Box my={2} />
            <Typography className={classStyle.text}>
              <Typography component="span" fontWeight="bold" className={classStyle.text}>
                ขั้นตอนที่ 1 :{' '}
              </Typography>
              เตรียม
            </Typography>
            <Typography className={classStyle.text}>
              การเตรียมตัวที่เหมาะสมจะช่วยให้คุณและทีมงานทำความสะอาดได้อย่างมีประสิทธิภาพและปลอดภัยยิ่งขึ้น
              เช็คให้ดีว่า:
            </Typography>
            <Typography className={classStyle.text}>
              • ระบายอากาศในที่พักทั้งก่อนและระหว่างการทำความสะอาด หากทำได้
            </Typography>
            <Typography className={classStyle.text}>
              • ใช้น้ำยาฆ่าเชื้อโรคที่ได้รับการรับรองจากหน่วยงานกำกับดูแลในท้องถิ่นว่าเหมาะกับเชื้อ COVID-19
            </Typography>
            <Typography className={classStyle.text}>
              • อ่านคำแนะนำและคำเตือนของผลิตภัณฑ์ทำความสะอาดอย่างรอบคอบ
            </Typography>
            <Typography className={classStyle.text}>• ล้างหรือฆ่าเชื้อบนมือ</Typography>

            <Box my={2} />
            <Typography className={classStyle.text}>
              <Typography component="span" fontWeight="bold" className={classStyle.text}>
                ขั้นตอนที่ 2 :{' '}
              </Typography>
              ทำความสะอาด
            </Typography>
            <Typography className={classStyle.text}>
              การทำความสะอาดเป็นการกำจัดฝุ่นละอองและสิ่งสกปรกออกจากพื้นผิว เช่น พื้นห้องและด้านบนเคาน์เตอร์
              เช็คให้ดีว่า:
            </Typography>
            <Typography className={classStyle.text}>• กวาด ดูดฝุ่น ปัดเศษผงและ/หรือเช็ดถูพื้นก่อนลดเชื้อ</Typography>
            <Typography className={classStyle.text}>
              • ล้างจานชามและซักรีดผ้าทั้งหมด โดยตั้งอุณหภูมิน้ำสูงสุดที่ทำได้
            </Typography>
            <Typography className={classStyle.text}>• เช็ดทำความสะอาดพื้นผิวแข็งด้วยสบู่และน้ำ</Typography>

            <Box my={2} />
            <Typography className={classStyle.text}>
              <Typography component="span" fontWeight="bold" className={classStyle.text}>
                ขั้นตอนที่ 3 :{' '}
              </Typography>
              ลดเชื้อ
            </Typography>
            <Typography className={classStyle.text}>
              การลดเชื้อเป็นการใช้สารเคมีในการลดจำนวนแบคทีเรียที่อยู่บนพื้นผิว เช่น ลูกบิดประตูและรีโมททีวี
              เช็คให้ดีว่า:
            </Typography>
            <Typography className={classStyle.text}>
              • พ่นสเปรย์ฆ่าเชื้อที่ได้รับการรับรองบนพื้นผิวที่มีการสัมผัสบ่อยในแต่ละห้อง
            </Typography>
            <Typography className={classStyle.text}>
              • ปล่อยให้น้ำยาฆ่าเชื้อทำงานตามระยะเวลาที่ระบุบนฉลากผลิตภัณฑ์
            </Typography>
            <Typography className={classStyle.text}>• ปล่อยให้พื้นผิวแห้ง</Typography>

            <Box my={2} />
            <Typography className={classStyle.text}>
              <Typography component="span" fontWeight="bold" className={classStyle.text}>
                ขั้นตอนที่ 4 :{' '}
              </Typography>
              ตรวจสอบ
            </Typography>
            <Typography className={classStyle.text}>
              หากต้องการเข้าถึงเช็คลิสต์การทำความสะอาดที่กำหนดเอง ให้ไปที่ ข้อมูลเชิงลึก {'>'} การทำความสะอาด
              เช็คให้ดีว่า:
            </Typography>
            <Typography className={classStyle.text}>
              • ดูแนวปฏิบัติในเช็คลิสต์ของแต่ละห้อง เพื่อทำความสะอาดและลดเชื้อที่พักให้ทั่วก่อนเปิดให้ผู้เข้าพักคนต่อไป
            </Typography>
            <Typography className={classStyle.text}>
              • แชร์แนวปฏิบัติเหล่านี้กับทีมจัดการที่พักและพนักงานทำความสะอาด
            </Typography>

            <Box my={2} />
            <Typography className={classStyle.text}>
              <Typography component="span" fontWeight="bold" className={classStyle.text}>
                ขั้นตอนที่ 4 :{' '}
              </Typography>
              รีเซ็ต
            </Typography>
            <Typography className={classStyle.text}>
              ทำความสะอาดและลดเชื้อในห้องให้เรียบร้อยเพื่อป้องกันการปนเปื้อนข้าม
              ก่อนที่จะเปลี่ยนข้าวของเครื่องใช้ใหม่สำหรับผู้เข้าพักรายถัดไป เช็คให้ดีว่า:
            </Typography>
            <Typography className={classStyle.text}>
              • ล้างมือก่อนเปลี่ยนอุปกรณ์ ผ้าปูที่นอนและผ้าขนหนู และชุดอุปกรณ์ทำความสะอาดให้ผู้เข้าพัก
            </Typography>
            <Typography className={classStyle.text}>
              • ซักอุปกรณ์ทำความสะอาดและอุปกรณ์ป้องกัน หรือกำจัดทิ้งอย่างถูกวิธี
            </Typography>
            <Typography className={classStyle.text}>• อย่ากลับเข้าไปห้องที่ลดเชื้อเรียบร้อยแล้ว</Typography>
            <Typography className={classStyle.text}>• ทำความสะอาดอุปกรณ์ในช่วงจัดเตรียมที่พัก</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={3} mt={4}>
          <Grid item xs={12}>
            <Typography variant="h6" className={classStyle.text}>
              ต้องตกลงที่จะทำตามขั้นตอนการทำความสะอาดในที่พักทุกแห่ง
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classStyle.text}>
              เจ้าของที่พักที่ไม่ยอมรับแนวปฏิบัติด้านความปลอดภัยในสถานการณ์ COVID-19 รวมถึง 5
              ขั้นตอนการทำความสะอาดแบบพิเศษอาจรับการจองใหม่ไม่ได้
            </Typography>
            <Box my={2} />
            <Typography className={classStyle.text}>
              แนวปฏิบัติเหล่านี้กำหนดให้ต้องสวมหน้ากากและรักษาระยะห่างระหว่างบุคคลหากมีข้อกฎหมายหรือคำแนะนำจากหน่วยงานท้องถิ่น
              รวมทั้งต้องปฏิบัติตาม 5 ขั้นตอนการทำความสะอาดแบบพิเศษ หากพบว่าเจ้าของที่พักละเมิดมาตรฐานการทำความสะอาดซ้ำๆ
              หรืออย่างรุนแรง อาจได้รับคำเตือน ถูกระงับ หรือลบออกจากแพลตฟอร์ม Mindstay ในบางกรณี
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={3} mt={4}>
          <Grid item xs={12}>
            <Typography variant="h6" className={classStyle.text}>
              แชร์ความมุ่งมั่นในการทำความสะอาดแบบพิเศษกับผู้เข้าพัก
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classStyle.text}>
              หลังจากที่คุณหรือสมาชิกในทีมจัดการที่พักตกลงที่จะทำความสะอาดแบบพิเศษแล้ว
              ผู้เข้าพักจะเห็นสัญลักษณ์ในประกาศที่พัก
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={3} mt={5}>
          <Grid item xs={12}>
            <Typography variant="h6" className={classStyle.text}>
              นโยบายความเป็นส่วนตัว
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={3} mt={5}>
          <Grid item xs={12}>
            <Typography variant="h6" className={classStyle.text}>
              นโยบายเกี่ยวกับคุกกี้
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classStyle.text}>
              ไซต์ของเราอาจใช้คุกกี้และอนุญาตให้บุคคลที่สามใส่คุกกี้ (ทั้งประเภท session และ persistent), พิกเซล/แท็ก,
              ชุดพัฒนาซอฟต์แวร์ (SDK), แอปพลิเคชั่น โปรแกรม อินเตอร์เฟซ (&quot;API&quot;) และเทคโนโลยีอื่นๆ
              (รวมเรียกว่า&quot;คุกกี้&quot;) บนไซต์ของเรา ซึ่งอาจรวบรวมและจัดเก็บข้อมูลบางอย่างเกี่ยวกับท่าน
              คุกกี้บางคุกกี้เหล่านี้มีความจำเป็นสำหรับการจัดหา ดูแลความปลอดภัย และบำรุงรักษาการทำงานพื้นฐานของไซต์ เช่น
              คงสถานะการเข้าสู่ระบบของท่านไว้ขณะที่ท่านเยี่ยมชมไซต์ของเรา (“คุกกี้เพื่อการทำงาน”)
              ขณะที่มีการใช้งานคุกกี้อื่นๆ เพื่อมอบประสบการณ์การใช้งานไซต์ที่ดียิ่งขึ้นให้แก่ท่าน เช่น:
            </Typography>
            <Box mt={2} />
            <Typography className={classStyle.text}>
              เพื่อปรับให้ไซต์ให้บริการตรงกับความต้องการของท่าน โดยการจดจำกิจกรรมของท่านบนไซต์ (เช่น ภาษาที่ท่านเลือกใช้
              หรือข้อมูลการเข้าสู่ระบบของท่าน)
              นอกจากนี้เรายังอาจใช้คุกกี้ร่วมกับข้อมูลการใช้งานที่เก็บรวบรวมโดยอัตโนมัติอื่นๆ
              เพื่อจดจำผู้ใช้ซึ่งใช้หลายอุปกรณ์ เซสชันหรือเบราว์เซอร์ (รวมถึงเมื่อผู้ใช้ไม่ได้เข้าสู่ระบบ)
              เพื่อส่งข้อมูลที่ปรับแต่งให้ตรงกับความต้องการ วิเคราะห์เว็บไซต์ในเรื่องที่ไม่สำคัญ เช่น
              การรายงานอมเพรชชั่น รายงานข้อมูลประชากร และรายงานข้อมูลความสนใจ สิ่งนี้อาจรวมถึงการเก็บข้อมูลการคลิกเมาส์
              การเลื่อนเมาส์ การเลื่อน scroll ที่หน้าเพจ และคำที่เราไม่อนุญาตให้ใช้ที่กรอกลงในแบบฟอร์มของไซต์ของเรา
              โดยผ่านบุคคลที่สามที่เราเป็นผู้เลือก
              แต่เราจะใช้ความระมัดระวังที่เหมาะสมในการดูแลให้แน่ใจว่าจะไม่มีการเก็บข้อมูลส่วนตัวในระหว่างที่มีการเก็บข้อมูลเหล่านี้
              เช่น การซ่อนข้อมูลด้วยวิธี irreversible masking มีการใช้ website analytics
              เพื่อปรับปรุงไซต์และบริการของเรา และ เพื่อลงโฆษณาที่ตรงกับความสนใจของท่าน (เรียกรวมกันว่า
              &quot;คุกกี้ที่ไม่ใช่เพื่อการทำงาน&quot;)
            </Typography>
            <Typography className={classStyle.text}>
              การใช้คุกกี้เพื่อการทำงานและคุกกี้ที่ไม่ใช่เพื่อการทำงานของเราอยู่ภายใต้การใช้งานทางภูมิศาสตร์ตามรายละเอียดด้านล่าง
            </Typography>
            <Box mt={2} />
            <Typography className={classStyle.text}>ผู้เยี่ยมชมไซต์ในสหภาพยุโรป/สหราชอาณาจักร</Typography>
            <Box mt={2} />
            <Typography className={classStyle.text}>
              สำหรับบุคคลที่เข้าถึงไซต์ของเราจากภายในสหภาพยุโรป (&quot;สหภาพยุโรป&quot;) หรือสหราชอาณาจักร
              (&quot;สหราชอาณาจักร&quot;) (&quot;ผู้เยี่ยมชมไซต์ในสหภาพยุโรป/สหราชอาณาจักร&quot;)
              เราอาจใช้คุกกี้เพื่อการทำงานบนไซต์
            </Typography>
            <Box mt={2} />
            <Typography className={classStyle.text}>
              เราไม่ใช้คุกกี้ที่ไม่ใช่เพื่อการทำงานบนไซต์ที่เราให้บริการในสหภาพยุโรปหรือสหราชอาณาจักร
            </Typography>
            <Box mt={2} />
            <Typography className={classStyle.text}>ผู้เยี่ยมชมไซต์นอกสหภาพยุโรป/สหราชอาณาจักร</Typography>
            <Box mt={2} />
            <Typography className={classStyle.text}>
              สำหรับบุคคลที่เข้าถึงไซต์ของเราจากเขตอำนาจศาลนอกสหภาพยุโรปและสหราชอาณาจักร
              (&quot;ผู้เยี่ยมชมไซต์นอกสหภาพยุโรป/สหราชอาณาจักร&quot;)
              เราอาจใช้ทั้งคุกกี้เพื่อการทำงานและคุกกี้ที่ไม่ใช่เพื่อการทำงานบนไซต์ นอกจากนี้
              ด้านล่างนี้เราได้ให้ข้อมูลสำหรับผู้เยี่ยมชมไซต์นอกสหภาพยุโรป/สหราชอาณาจักรโดยเฉพาะสำหรับการใช้คุกกี้ที่ไม่ใช่เพื่อการทำงานบนไซต์ที่เราให้บริการนอกสหภาพยุโรปและสหราชอาณาจักร
            </Typography>
            <Box mt={2} />
            <Typography className={classStyle.text}>การโฆษณาที่อิงตามความสนใจของผู้บริโภค</Typography>
            <Box mt={2} />
            <Typography className={classStyle.text}>
              เรายังอาจอนุญาตให้บุคคลที่สามบางรายใส่คุกกี้ที่ไม่ใช่เพื่อการทำงานบนไซต์ของเรา
              เพื่อรวบรวมข้อมูลเกี่ยวกับกิจกรรมออนไลน์ของท่านบนไซต์ของเรา (เช่น หน้าที่เยี่ยมชมบนไซต์และข้อมูลการค้นหา)
              ในระยะเวลาหนึ่ง และจากเว็บไซต์ต่างๆ ที่ท่านไปเยือน
              ข้อมูลนี้จะใช้สำหรับโฆษณาของเราที่ออกแบบให้ตรงกับความสนใจของท่านโดยเฉพาะ (ผ่านทางอีเมล ไซต์ของเรา
              และเว็บไซต์อื่นๆ) และจากบุคคลที่สามบนเว็บไซต์อื่นๆ ที่ท่านอาจเยี่ยมชม (เรียกโดยทั่วไปว่า
              การโฆษณาที่อิงตามความสนใจของผู้บริโภค)
              และเพื่อวิเคราะห์ประสิทธิภาพของโฆษณาที่อิงตามความสนใจของผู้บริโภคดังกล่าว
              เรายังอาจแบ่งปันข้อมูลแฮชทางเดียว (one-way hashed information) กับพันธมิตรบุคคลที่สาม (เช่น Facebook)
              ซึ่งอาจรวมข้อมูลแฮชกับตัวบ่งชี้อื่นๆ เพื่อให้บริการโฆษณาของอโกด้าที่อิงตามความสนใจส่วนบุคคล
              บนเว็บไซต์อื่นๆ หรือบนแอปพลิเคชั่นของอุปกรณ์พกพา โดยอ้างอิงจากการเยี่บมชมไซต์ของท่านในครั้งก่อนหน้า
              อโกด้ามิได้สนับสนุนหรือรับรองจุดมุ่งหมาย อุดมการณ์ หรือคำประกาศของเว็บไซต์หรือแอปพลิเคชั่นใดๆ
              ที่แสดงโฆษณาของเรา
            </Typography>
            <Box mt={2} />
            <Typography className={classStyle.text}>การติดตามข้ามอุปกรณ์</Typography>
            <Box mt={2} />
            <Typography className={classStyle.text}>
              เราอาจนำข้อมูลที่รวบรวมผ่านคุกกี้ที่ไม่ใช่เพื่อการทำงานและข้อมูลเกี่ยวกับการใช้งานบางประการจากบางเบราว์เซอร์หรืออุปกรณ์พกพา
              ไปรวมกับคอมพิวเตอร์หรืออุปกรณ์อีกเครื่องที่อาจเชื่อมโยงกับท่าน (การติดตามข้ามอุปกรณ์)
              เพื่อให้บริการของเราแก่ท่านได้อย่างดีที่สุด
              รวมถึงติดต่อสื่อสารและแสดงโฆษณาของอโกด้าที่ตรงกับความสนใจของท่าน
              หากท่านไม่ต้องการให้อโกด้ารวมข้อมูลดังกล่าวเข้าด้วยกัน เพื่อให้การสื่อสารถึงท่านมีคุณภาพสูงสุด
              กรุณายกเลิกรับการติดต่อสื่อสารจากอโกด้า เช่น จดหมายข่าว เป็นต้น
            </Typography>
            <Box mt={2} />
            <Typography className={classStyle.text}>ทางเลือกของท่าน</Typography>
            <Box mt={2} />
            <Typography className={classStyle.text}>
              กรุณาตรวจสอบการตั้งค่าเบราว์เซอร์ของท่าน ซึ่งมักอยู่ในหัวข้อ &quot;ความช่วยเหลือ&quot; หรือ
              &quot;ตัวเลือกอินเทอร์เน็ต&quot;
              เพื่อกำหนดการใช้งานคุกกี้เพื่อการทำงานและคุกกี้ที่ไม่ใช่เพื่อการทำงานบางตัว{' '}
            </Typography>
            <Typography className={classStyle.text}>
              หากท่านปิดการทำงานหรือลบคุกกี้เพื่อการทำงานหรือคุกกี้ที่ไม่ใช่เพื่อการทำงานบางตัวผ่านการตั้งค่าเบราว์เซอร์
              ท่านอาจไม่สามารถเข้าถึง หรือใช้งานฟังก์ชั่นหรือฟีเจอร์สำคัญบนไซต์นี้ได้
              และอาจต้องกรอกรายละเอียดสำหรับการลงชื่อเข้าสู่ระบบอีกครั้ง
            </Typography>{' '}
            <Box mt={2} />
            <Typography className={classStyle.text}>
              สำหรับข้อมูลเพิ่มเติมเกี่ยวกับคุกกี้ที่ไม่ใช่เพื่อการทำงานบางตัว
              ที่ใช้สำหรับการโฆษณาที่อิงตามความสนใจของผู้บริโภค (รวมถึงผ่านทางเครื่องมือติดตามข้ามอุปกรณ์)
              และเพื่อยกเลิกการใช้งานใดๆ ที่เกี่ยวข้องกับคุกกี้ที่ไม่ใช่เพื่อการทำงานนั้นๆ กรุณาไปที่เว็บไซต์ Digital
              Advertising Alliance, Network Advertising Initiative, Digital Advertising Alliance-Canada หรือ
              สำหรับแอปพลิเคชั่นของเรา กรุณาอัพเดตการตั้งค่าของอุปกรณ์พกพาของท่าน หรือดาวน์โหลดแอปพลิเคชั่น AppChoices
            </Typography>
            <Box mt={2} />
            <Typography className={classStyle.text}>
              กรุณาเยี่ยมชมเว็บไซต์ของบุคคลที่สามดังต่อไปนี้ด้วยเช่นกัน เพื่อยกเลิกตัวเลือกบางอย่างเกี่ยวกับคุกกี้:
            </Typography>
            <Box mt={2} />
            <Typography className={classStyle.text}>
              Google Analytics - https://tools.google.com/dlpage/gaoptout?hl=en
            </Typography>
            <Typography className={classStyle.text}>
              Appsflyer (เครื่องมือวิเคราะห์บนแอปพลิเคชั่น) - อีเมลไปยัง appsflyer ที่: privacy@appsflyer.com
            </Typography>
            <Typography className={classStyle.text}>Baidu - http://www.baidu.com/duty/safe_control.html</Typography>
            <Typography className={classStyle.text}>Apple - https://support.apple.com/en-us/HT202074</Typography>
            <Typography className={classStyle.text}>Facebook - https://www.facebook.com/ads/settings</Typography>
            <Typography className={classStyle.text}>Google Ads - https://adssettings.google.com/</Typography>
            <Typography className={classStyle.text}>Criteo - https://www.criteo.com/privacy/</Typography>
            <Typography className={classStyle.text}>Mouseflow recording - https://mouseflow.com/opt-out/</Typography>
            <Typography className={classStyle.text}>SecuredTouch - https://www.securedtouch.com/privacy/</Typography>
            <Typography className={classStyle.text}>
              สำหรับการยกเลิกการใช้งานซึ่งเกี่ยวข้องกับการโฆษณาที่อิงตามความสนใจของผู้บริโภค ท่านอาจยังคงได้รับโฆษณา
              แต่เครือข่ายที่ท่านยกเลิกการใช้งานจะไม่ส่งโฆษณาที่ออกแบบให้ตรงกับความสนใจของท่านให้แก่ท่านอีกต่อไป
              โปรดทราบเช่นกันว่า การออกจากบัญชีผู้ใช้งานของท่านไม่ได้หมายความว่าท่านเลือกไม่รับโฆษณาแบบส่วนบุคคลแล้ว
            </Typography>
            <Box mt={2} />
            <Typography className={classStyle.text}>
              ท่านอาจต้องดำเนินการบนแต่ละเบราว์เซอร์ รวมถึงอุปกรณ์ที่ท่านอาจใช้
              เพื่อดำเนินการเกี่ยวกับคุกกี้เพื่อการทำงานและคุกกี้ที่ไม่ใช่เพื่อการทำงานบางตัว สุดท้ายนี้
              ไซต์ของเรายังมิได้ตั้งค่าให้รองรับสัญญาณเบราว์เซอร์ &quot;Do Not Track&quot; ในขณะนี้
              ยกเว้นเมื่อกฎหมายที่ใช้บังคับกำหนด
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <CardMedia component="img" image={resourceImg.src} sx={{ width: '100%' }} />
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
};

export default HelpPage;
