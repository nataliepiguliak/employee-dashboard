<template>
  <div class="file-upload-container">
    <input accept=".csv" type="file" @change="onFileChange" />
    <button :disabled="!this.selectedFile" class="file-upload-button" @click="onUploadFile">
      Upload file
    </button>
  </div>
</template>

<script lang="ts">
import DashboardService from '@/services/DashboardService'

export default {
  name: 'FileUpload',
  data() {
    return {
      selectedFile: ''
    }
  },
  methods: {
    onFileChange(e) {
      const selectedFile = e.target.files[0]
      this.selectedFile = selectedFile
      this.$emit('fileSelected')
    },
    onUploadFile() {
      const formData = new FormData()
      formData.append('file', this.selectedFile)
      DashboardService.post(formData).then((res) => {
        this.$emit('validationResult', res.data)
      })
    }
  }
}
</script>

<style scoped>
.file-upload-container {
  display: flex;
  flex-direction: column;
}

.file-upload-button {
  margin-top: 1em;
  width: 150px;
}
</style>
