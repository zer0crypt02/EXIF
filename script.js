document.getElementById('imageInput').addEventListener('change', function(e) {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = function(event) {
      const img = new Image();
      img.onload = function() {
          try {
              EXIF.getData(img, function() {
                  const exifTable = document.getElementById('exifTable');
                  const exifDataBody = document.getElementById('exifData');
                  exifDataBody.innerHTML = '';

                  const allTags = EXIF.getAllTags(this);
                  
                  if (Object.keys(allTags).length === 0) {
                      exifDataBody.innerHTML = `
                          <tr>
                              <td colspan="2" class="no-exif">
                                  Bu resimde EXIF bilgisi bulunamadı
                              </td>
                          </tr>
                      `;
                  } else {
                      for (let tag in allTags) {
                          const row = document.createElement('tr');
                          const tagNameCell = document.createElement('td');
                          const tagValueCell = document.createElement('td');
                          
                          tagNameCell.textContent = tag;
                          tagValueCell.textContent = allTags[tag];
                          
                          row.appendChild(tagNameCell);
                          row.appendChild(tagValueCell);
                          exifDataBody.appendChild(row);
                      }
                  }
                  
                  exifTable.style.display = 'table';
              });
          } catch (error) {
              console.error('EXIF bilgileri alınırken hata oluştu:', error);
          }
      };
      img.src = event.target.result;
  };

  reader.readAsDataURL(file);
});
