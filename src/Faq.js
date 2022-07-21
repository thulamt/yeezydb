import "bootstrap/dist/css/bootstrap.min.css";
import {Image} from 'react-bootstrap';
const FAQ = () => {
    return (  
        <div className="faq container pt-5 my-4">
            <h1>FAQ</h1>
            <h4>Sizing</h4>
            <p>Finding the right shoe size for Yeezys can 
                be difficult due to inconsistencies in the sizing.</p>
            <p>This following information references the Yeezys Subreddit sizing guide.</p>
            <p>Terminology: TTS = True to size</p>
            <h5>Size Conversions</h5>
            <h6>Mens to women’s sizing</h6>
            <div className="row">
            <div className="col">
            

<p>The advice here is for converting men's and women's sizes, 
    NOT YEEZY sizes. First convert the size to men's, and then 
    convert to the Yeezy size.</p>
<p>US</p>
<p>Usually, US men’s sizes are 1.5 LESS than the US women’s 
    equivalent. For example, a women’s size 6 would be a men’s 4.5.
     For anybody looking to buy women's sizing, your size will be: your size - 1.5.</p>

     <p>UK</p>
     <p>UK sizes are the same for both men's and women's. For example, 
        UK 6 is the same for both men's and women's. The only difference is 
        that sometimes men's sizes will be wider, but there is hardly any 
        difference when it comes to Yeezys.</p>

    <p>EU</p>
    <p>EU sizes are the same for both men's and women's. For example, 
        EU 39 is the same for both men's and women's. The only difference 
        is that sometimes men's sizes will be wider, but there is hardly any
         difference when it comes to Yeezys.</p>

            </div>
            <div className="col"><Image src={require('./assets/faq.jpg')} alt="Zebra 350 V2" /></div>
            </div>
            <h5>Your Yeezy Size</h5>
         <p>You may be used to seeing the term "True To Size"
             (TTS) in the sneaker community. Your TTS is the size tha
             t you usually get for shoes, such as a US 10 in Puma, Nike, 
             other Adidas shoes etc. This kind of goes out the window with
              Yeezy, since their sizing is not on the usual scale. Some 
              people have to get half or even a full size up from their 
              TTS.</p>


            <p>The best way to find your Yeezy Size is to
            first convert your TTS to US, since this is the most 
            consistent across the different sizing schemes. 
            Then follow the size guide and buy what is recommend 
            from your actual TTS, for example, it is recommended 
            that you buy half a size up from your TTS for the 350 V2. 
            If the half up fits, then great! Your TTS is your Yeezy 
            Size as well, but if you find that the shoe doesn't fit 
            correctly at what is recommended, then your Yeezy Size is 
            most likely different from your actual TTS.</p>

            <p>Depending on the silhouette you bought, 
                you will have to figure out what would be comfortable by 
                working backwards from what the Size Guide recommends.</p>

                <p>If you can't even get your foot in the shoe, 
                    you're probably need at least a full size up.</p>
            <p>If the shoe fits but its uncomfortable for your toes,
                         chances are that this size is your Yeezy Size,
                          as half up would fit better and would match the 
                          recommended sizing.</p>
            <p>If it fits perfectly first time, your Yeezy Size
                             is the same as your actual TTS.</p>
            <p>If the shoe fits but there is a lot of room,
                                 and/or heel slip, chances are that your 
                                 Yeezy Size is a full size down 
                                 from the size purchased.</p>
            <p>Finding your size will take trial and error. 
                If you have a retailer that stock Yeezy, 
                it might be worth asking if you can try a pair on. 
                Once you have your Yeezy Size, use it as the 
                "TTS" when using the Size Guide.</p>
                

<h5>If your pair doesn't fit you</h5>
<h6>Shoes are too small</h6>
<p>If your shoes are too small/too tight, we recommend 
    removing the insoles from both pairs, as well as wearing 
    thinner or no socks. This is only recommended for sizes 
    that are half a size smaller than your shoe size. </p>
    <p>If you cannot wear the shoe comfortably, 
    we do not advise wearing them any longer, 
    and to sell them or put them in storage.</p>

<h6>Shoes are too big</h6>
<p>If your shoes are too big/too loose, 
    we recommend adding sole inserts to your shoes, 
    as well as wearing thicker socks. This is only 
    recommended for sizes that are half a size or a 
    full size bigger than your shoe size.</p> 
    <p>If you cannot wear the shoe comfortably, 
        we do not advise wearing them any longer, 
        and to sell them or put them in storage.</p>
        <h5>For more information, please refer to the </h5>
        <p><a href="https://www.reddit.com/r/yeezys/wiki/faq/sizing/">r/Yeezys Sizing Guide</a></p>
        <h4>Technical issues</h4>
        <p>For technical inquiries, contact us by sending an email to help@yeezydb.com</p>
        </div>
    );
}
 
export default FAQ;