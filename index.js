(function ($) {
  const popAdContainer = document.getElementById("pop-ad-container");

  let jsonData;
  // 定義每個標籤對應的圖片
  const tagImages = {
    彈性: [],
    材質: [],
    場合: [],
  };
  let selectedTag = "彈性"; // 這裏可以根據實際選擇動態設置

  const breakpoint = 992;

  // 監聽窗口大小變化
  window.addEventListener("resize", handleWindowResize);

  // 首次載入時執行檢查
  handleWindowResize();

  function handleWindowResize() {
    // 取得當前視窗寬度
    const windowWidth = window.innerWidth;

    // 當視窗寬度大於等於 992px (桌面版)
    if (windowWidth >= breakpoint) {
      popAdContainer.setAttribute("data-bs-scroll", "true");
    } else {
      popAdContainer.setAttribute("data-bs-scroll", "false");
    }
  }

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
  let startX, endX;
  let all_Route;

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
    const fakeData = [
      {
        alt: "秋季新品\n限時優惠中",
        price: "2024/9/5 至 9/10",
        src: "",
        link: "https://www.tendamotor.com/products/mt-60%E2%84%A2-rs",
      },
      {
        alt: "鱷魚皮革磚色背包",
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
        alt: "簡約午夜黑背心",
        price: "NT 1,890",
        src: "https://s3-alpha-sig.figma.com/img/a81a/42e8/1838de1e25c34f95d043804662a580a2?Expires=1727654400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CZHd-Xmf-KrUnBcLKCusVR5avt5ofkicMoEA2~uaEsK4lf1d14EllWEZUDi0egZ05nRhtu1pi4eTHTfPCtkn64FzNEhN0j0mMUgvgYPvpCesmcz9h~JS1BHn18NsBPo~neMpbAPaeDKOs9O0V6q0uUP~kKdn-ToLQc~~NzVLKbRkls3tQ4shpsEzMliGjwLiBLMpYa~9CstqVRNEEdO76x5DPw4zBreq9Uq9J69kdAtO38MxQBh5ikg6tSVK7DY4KLCxqvixvqqq~jqFBMHY~7U1a4U8bPrMTBrk8uZ-9Tp3hETo~xNUlK1pIkrI6rUS35Ju4drdsmEac3qnm2o7SQ__",
        link: "https://www.tendamotor.com/products/mt-60%E2%84%A2-rs",
      },
    ];
    const items = fakeData
      .map(
        (img) =>
          `
  <div class="pop-item" onclick="window.open('${img.link}')" style="background: linear-gradient(0deg, rgba(0, 0, 0, 0.24) 0%, rgba(0, 0, 0, 0.24) 100%), url(${img.src}) lightgray 50% / cover no-repeat;">
     <div class="pop-item-info" style="width: 100%">
       <div class="pop-item-title">${img.alt}</div>
       <p class="pop-item-price">NT$${img.price}</p>
     </div>
  </div>
        `
      )
      .join("");
    $("#pop-ad-img-container").html(items);
  }
})(jQuery);
