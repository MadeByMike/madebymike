<svg height="560" preserveAspectRatio='xMinYMin' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <style>

    /*** Changing the height of embedded SVG ***/

    /* Important: Setting the height on the SVG doesn't work!!! */
    /* The image in the HTML sets its own height based on the SVG attribute value only */
    /* The image will not resize when given media queries in the CSS. */
    /* This is the same for other methods of embedding external SVG. */
    /* I've kept this CSS to demonstrate how I would like it to work. */


    /*** Changing X &amp; Y attributes with CSS ***/

    /* For the most part setting and changing X &amp; Y attributes of SVG elements with CSS */
    /* does not work. Although this will be fully possible in SVG 2.0, there is an exception */
    /* to this rule for image elements, that we can take advantage of now. */

    svg { height: 560px; }

    image { width: 100%; }
    .product-image { height: 280px; y: 100; }
    .product-footer { y: 380; }

    @media screen and (min-width: 700px){

      svg { height: 280px !important; }
      .product-image { y: 0; x: 0; width: 300px; }
      .product-header { x: 300; width: calc(100% - 300px); }
      .product-footer { x: 300; y: 100; width: calc(100% - 300px); }
    }

  </style>

  <!-- # Why base64 encoded data URIs? -->
  <!-- When external SVG files are loaded in an HTML document, such as in an:  -->
  <!-- image, background, iframe or object element they will not load additional linked resources. -->
  <!-- Perhaps this is to prevent recursive references, or for network performance reasons. -->
  <!-- Either way I can get around this limitation using dataURIs. I wrote a simple build -->
  <!-- process to assist me with compiling the final SVG source. -->

  <image width="auto" class="product-image" xlink:href="data:image/jpeg;base64,<%- cqimage %>"/>
  <image width="auto" height="100px" class="product-header" xlink:href="data:image/svg+xml;base64,<%- cqheader %>"/>
  <image width="auto" height="180px" class="product-footer" xlink:href="data:image/svg+xml;base64,<%- cqfooter %>"/>
</svg>
