//
//  StoryOverviewTableViewCell.h
//  homemore
//
//  Created by Ken Zheng on 10/22/16.
//  Copyright © 2016 1904Labs. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface StoryOverviewTableViewCell : UITableViewCell
@property (weak, nonatomic) IBOutlet UIImageView *ivIcon;
@property (weak, nonatomic) IBOutlet UILabel *lblTitle;
@property (weak, nonatomic) IBOutlet UILabel *lblAmount;
@property (weak, nonatomic) IBOutlet UIProgressView *progressView;
@property (weak, nonatomic) IBOutlet UILabel *lblDesc;
@property (weak, nonatomic) IBOutlet UILabel *lblName;

@end
