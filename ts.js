(function ($) {
  var embeddedContainer = `
          <div id="embedded-ad-container">
          <h3 class="embedded-ad-container-title">您可能也會喜歡</h3>
          <div class="embedded-ad-img-container carousel-container owl-carousel owl-theme owl-loaded">
              <!-- ad 內容將由 JavaScript 動態生成 -->
          </div>
        </div>
  `;

  var contentBox = $(".pd-box");
  contentBox.append(embeddedContainer);
  $(".embedded-ad-img-container").on("touchstart", (e) => {
    $(".embedded-ad-img-container").slick("slickPlay");
  });
  let jsonData;
  // 定義每個標籤對應的圖片
  const tagImages = {
    彈性: [],
    材質: [],
    場合: [],
  };
  let selectedTag = "彈性"; // 這裏可以根據實際選擇動態設置

  $(function () {
    console.log("DOM is ready");
    get_recom_res();
  });
  var reset;
  var ClothID = "TDA_All";
  var Brand = "TDA";
  var tags_chosen = {
    彈性: [
      {
        Description: "example",
        Imgsrc: "https://example.com/imageB1.png",
        Name: "example",
        Tag: "1721875900838",
        TagGroup: "彈性",
      },
    ],
    場合: [
      {
        Description: "example",
        Imgsrc: "https://example.com/imageB1.png",
        Name: "example",
        Tag: "1721875746070",
        TagGroup: "場合",
      },
    ],
    材質: [
      {
        Description: "example",
        Imgsrc: "https://example.com/imageB1.png",
        Name: "example",
        Tag: "1721875867435",
        TagGroup: "材質",
      },
    ],
  };

  const get_recom_res = () => {
    let options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        Brand: Brand,
        Tags: tags_chosen,
        NUM: 18,
      }),
    };
    console.log("tags chosen:", tags_chosen);
    fetch(
      "https://ldiusfc4ib.execute-api.ap-northeast-1.amazonaws.com/v0/extension/recom_product",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        jsonData = response.Item;
        // 填充每個標籤對應的圖片
        jsonData.forEach((item) => {
          for (const tag in item.Tags) {
            if (item.TagsInclude.includes(tag)) {
              tagImages[tag].push({
                src: item.Imgsrc,
                alt: item.ItemName,
                price: item.price,
                link: item.Link,
              });
            }
          }
        });
        // 初始加載 "彈性" 標籤的圖片
        updatePopAd(tagImages["彈性"]);
      })
      //將 response.Item 的內容更新成頁面中的商品推薦版位
      .catch((err) => {
        console.error(err);
      });
  };

  // 更新pop ad圖片的函數
  function updatePopAd(images) {
    var fakeData = [
      {
        alt: "鱷魚皮革磚色揹包",
        price: "NT 3,990",
        src: "https://s3-alpha-sig.figma.com/img/2f4c/b06e/1b5c5b7e4c7cd7dcf1749f0a745243a2?Expires=1727654400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TcKHuxe-QwUKNPK~aqdTAGO3u7w9KHZY7SLPUnzLFIdInaOFNWAomth7PE4pXDHu2R-DkQfFjwmw7f9e-mtebt~y1uOXuuItPm3MlRJ1O9BgQgJ8r0CdTfk-o-LiPq5-3ZOD0JQjfqS~l3CowjoHdvYFHidvzoE6Z6187SRdf6d6ZuWp4WBQiPv1JHqyXqoZnc7p5EG~YuQ3gOtR8eV~9KNx9at17IdjOEQw1ouwSuXOGK8b6LnybUc1uik9H2RGE7KNyZUakl~czpsbNRsSuccXjDDZqXwjAcEfe7dovRKvi8PBkAXFd7ELUrtprdTnI7g5RQzYUZKod8lh5BZyhw__",
        link: "https://www.tendamotor.com/products/mt-60%E2%84%A2-rs",
      },
      {
        alt: "時尚米白風衣外套",
        price: "NT 7,990",
        src: "https://s3-alpha-sig.figma.com/img/bbb2/7873/8ace09af41c5bf458ac547ecef3471cb?Expires=1727654400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=e2ZcBY1I5L4hKt3AN62kD-2xwoAzMmyGtpZwKpX1r4EB9Y3wtwr0VtTsOa7ENJFlXtmQ0iade1Rxlier4pbrX9ahrYTD8hJwAQuOkPo~SIqa5Cponw3NoYo3UXvFMpeFT6~zOhONNHwsBjVK1jKhjjygVnj6yfFktULR2rz9FXHKdyE0820qiU293wCI4nT~6ogcWkBqZaJXrG-xICXFC~vSCC4US1MsAxTuEsoR5FUq12TjkxNaU2eOLOawWntKbPu38V5QePypS4kTemFOew2R8ucZFCu2Hw1Z6kGBp37aMgCDP2x~r9j5vk8IWY3M00OeWeNKSP3lOU67HzgUAg__",
        link: "https://www.tendamotor.com/products/mt-60%E2%84%A2-rs",
      },
      {
        alt: "純白西裝套裝",
        price: "NT 6,490",
        src: "https://s3-alpha-sig.figma.com/img/2ad7/2aa8/ffd25027cfce1062006b3e119ab0560d?Expires=1727654400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oEe189qtsOJXrLcDDBiwUjXjct-NAHVQEVrO5DHs3ogvN0JHDWzeBQoxo2akhHC6pCUDcBSNxBkMPleldGnffYSDvl1knHhgtTrxIrXJDyv2bt-ENKvw15mRfPensy63E~tAZvj5vlj8KnjJRco3a~SeRlM8Nqj6UBlo1plsfqOe7Z3kOEJvWZKqW4K5fzSO80tWY5Zz-5dgYINO699oSkq93z-4adlCUMkxNyBIkEC1SCMdZ88u5~EsuSeECCucogydbk6B4yHmIY7d6PPhL~oKlLqQDMIno7NCZvCGghl0o1wso7e3dwR12WVYDF5Ut2Q3KT-0ld11WnauEWVOnQ__",
        link: "https://www.tendamotor.com/products/mt-60%E2%84%A2-rs",
      },
      {
        alt: "莫蘭迪藍西裝套裝",
        price: "NT 5,990",
        src: "https://s3-alpha-sig.figma.com/img/b28a/ebca/182af92e3fd315a3472a296b0b86b547?Expires=1727654400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qgWVx8a3H8HFpIwCPDdFM2U~jK9P5yPrn2tbKkGW9NpnzLf2KL4C4AbyuZxkkGz8zUfrnG1aj6alaQBeBum~fl7~BMMMI-spvg1Zfx4ls0E54Jyd7IQGP3xgb7InZO7tYp4tLYuF02JY9Nv5GA5v7bmY65qmNaI4Vh2to-r3rojS6ZuqTL9hpE9tSfXdJOD~n7J7Pgl~yu0kc2hLygJmmaNl4G-Xu9CQQBLvZnrYw0h0PKc4e6l9JRByCIQfyEIMGLLqaHu7x1KLXCa2CKhgq19lAwYcpXEyji9gtnsb88lnP-eVLYkNOmtHpC-153P4aekuB7pMb1XqRFEdKqL71Q__",
        link: "https://www.tendamotor.com/products/mt-60%E2%84%A2-rs",
      },
      {
        alt: "鱷魚皮革磚色揹包",
        price: "NT 3,990",
        src: "https://s3-alpha-sig.figma.com/img/2f4c/b06e/1b5c5b7e4c7cd7dcf1749f0a745243a2?Expires=1727654400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TcKHuxe-QwUKNPK~aqdTAGO3u7w9KHZY7SLPUnzLFIdInaOFNWAomth7PE4pXDHu2R-DkQfFjwmw7f9e-mtebt~y1uOXuuItPm3MlRJ1O9BgQgJ8r0CdTfk-o-LiPq5-3ZOD0JQjfqS~l3CowjoHdvYFHidvzoE6Z6187SRdf6d6ZuWp4WBQiPv1JHqyXqoZnc7p5EG~YuQ3gOtR8eV~9KNx9at17IdjOEQw1ouwSuXOGK8b6LnybUc1uik9H2RGE7KNyZUakl~czpsbNRsSuccXjDDZqXwjAcEfe7dovRKvi8PBkAXFd7ELUrtprdTnI7g5RQzYUZKod8lh5BZyhw__",
        link: "https://www.tendamotor.com/products/mt-60%E2%84%A2-rs",
      },
      {
        alt: "時尚米白風衣外套",
        price: "NT 7,990",
        src: "https://s3-alpha-sig.figma.com/img/bbb2/7873/8ace09af41c5bf458ac547ecef3471cb?Expires=1727654400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=e2ZcBY1I5L4hKt3AN62kD-2xwoAzMmyGtpZwKpX1r4EB9Y3wtwr0VtTsOa7ENJFlXtmQ0iade1Rxlier4pbrX9ahrYTD8hJwAQuOkPo~SIqa5Cponw3NoYo3UXvFMpeFT6~zOhONNHwsBjVK1jKhjjygVnj6yfFktULR2rz9FXHKdyE0820qiU293wCI4nT~6ogcWkBqZaJXrG-xICXFC~vSCC4US1MsAxTuEsoR5FUq12TjkxNaU2eOLOawWntKbPu38V5QePypS4kTemFOew2R8ucZFCu2Hw1Z6kGBp37aMgCDP2x~r9j5vk8IWY3M00OeWeNKSP3lOU67HzgUAg__",
        link: "https://www.tendamotor.com/products/mt-60%E2%84%A2-rs",
      },
      {
        alt: "鱷魚皮革磚色揹包",
        price: "NT 3,990",
        src: "https://s3-alpha-sig.figma.com/img/2f4c/b06e/1b5c5b7e4c7cd7dcf1749f0a745243a2?Expires=1727654400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TcKHuxe-QwUKNPK~aqdTAGO3u7w9KHZY7SLPUnzLFIdInaOFNWAomth7PE4pXDHu2R-DkQfFjwmw7f9e-mtebt~y1uOXuuItPm3MlRJ1O9BgQgJ8r0CdTfk-o-LiPq5-3ZOD0JQjfqS~l3CowjoHdvYFHidvzoE6Z6187SRdf6d6ZuWp4WBQiPv1JHqyXqoZnc7p5EG~YuQ3gOtR8eV~9KNx9at17IdjOEQw1ouwSuXOGK8b6LnybUc1uik9H2RGE7KNyZUakl~czpsbNRsSuccXjDDZqXwjAcEfe7dovRKvi8PBkAXFd7ELUrtprdTnI7g5RQzYUZKod8lh5BZyhw__",
        link: "https://www.tendamotor.com/products/mt-60%E2%84%A2-rs",
      },
      {
        alt: "Beige Knit Beanie",
        price: "NT 7,990",
        src: "https://s3-alpha-sig.figma.com/img/551d/8746/900d7dea31d9770155d312db4ff5aaca?Expires=1727654400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FHYUEXju3~NQdW0cZ4kZztVrOWVuMzXS2lzg9dw0HPu7iMDyDOqw6fvmzaNY~b8Hpxyj8L245O3QvuwF3x1W3R4EH1asn4AUd6gI2zayQEpGi65hPJKe4wfqQS~z-7vKNaTemFoq3NhTjjtaC0MpMWkqoOFkSKOVFbq095~ITOmKTcHWZLnQ7DmsLQ5HAMxloc6dMLD1pOrQB62G8JsQt-Sw-ECjQPj329qhr8XZC7G0zD5jynyfmuP6JBQqcTUzoyZfju~Xa65hXNSDgP9N5DeRTtFIelMQAxkpug8MlsVOpWgAfLK0bcQ1REEByAYdfIZ9fyTpNgjXsAuV9kALUg__",
        link: "https://www.tendamotor.com/products/mt-60%E2%84%A2-rs",
      },
    ];

    const items = fakeData
      .map(
        (img) =>
          `
  <a class="embedded-item slick-slide" href="${img.link})" target="_blank">
  <div class="embedded-item--img">
    <img src="${img.src}" alt="${img.alt}" style="width: 100%; height: 100%; object-fit: cover; filter: brightness(80%);">
    </div>
    <div class="embedded-item-info">
      <h3 class="embedded-item-title">${img.alt}</h3>
      <p class="embedded-item-price">NT$${img.price}</p>
    </div>
  </a>
        `
      )
      .join("");
    $(".embedded-ad-img-container").html(items);

    $(".embedded-ad-img-container").slick({
      useTransform: false,
      pauseOnFocus: false,
      pauseOnHover: false,
      // fade: true,
      mobileFirst: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 3,
      autoplay: true,
      autoplaySpeed: 3500,
      dots: false,
      arrows: false,
      responsive: [
        {
          breakpoint: 0,
          settings: {
            rows: 2,
            slidesToShow: 2,
            slidesToScroll: 2,
            arrows: false,
          },
        },
        {
          breakpoint: 768,
          settings: {
            rows: 1,
            slidesToShow: 3,
            slidesToScroll: 3,
            arrows: true,
          },
        },
      ],
    });
  }
})(jQuery);
