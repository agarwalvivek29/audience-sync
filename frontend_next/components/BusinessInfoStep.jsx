'use client'

import { useSelector, useDispatch } from 'react-redux'
import { setBusinessInfo, setStep } from '@/lib/store';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function BusinessInfoStep() {
  const businessInfo = useSelector((state) => state.onboarding.businessInfo)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    dispatch(setBusinessInfo({ [e.target.name]: e.target.value }))
  }

  const handleSelectChange = (name, value) => {
    dispatch(setBusinessInfo({ [name]: value }))
  }

  return (
    (<form className="space-y-4">
      <div>
        <Label htmlFor="companyName">Company Name</Label>
        <Input
          id="companyName"
          name="companyName"
          value={businessInfo.companyName}
          onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="brand">Brand</Label>
        <Input
          id="brand"
          name="brand"
          value={businessInfo.brand}
          onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="logo">Logo URL</Label>
        <Input id="logo" name="logo" value={businessInfo.logo} onChange={handleChange} />
        {businessInfo.logo && <img
          src={businessInfo.logo}
          alt="Logo preview"
          className="mt-2 h-20 object-contain" />}
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <Select onValueChange={(value) => handleSelectChange('category', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="service">Service</SelectItem>
            <SelectItem value="software">Software</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="industry">Industry</Label>
        <Select onValueChange={(value) => handleSelectChange('industry', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hotels">Hotels</SelectItem>
            <SelectItem value="food">Food</SelectItem>
            <SelectItem value="technology">Technology</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="platform">Platform</Label>
        <Select onValueChange={(value) => handleSelectChange('platform', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="web">Web</SelectItem>
            <SelectItem value="mobile">Mobile</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="description">Description (Optional)</Label>
        <Input
          id="description"
          name="description"
          value={businessInfo.description}
          onChange={handleChange} />
      </div>
      <Button onClick={() => dispatch(setStep(2))}>Next</Button>
    </form>)
  );
}

