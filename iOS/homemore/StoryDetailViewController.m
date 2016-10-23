//
//  StoryDetailViewController.m
//  homemore
//
//  Created by Ken Zheng on 10/22/16.
//  Copyright © 2016 1904Labs. All rights reserved.
//

#import "StoryDetailViewController.h"
#import "StoryOverviewTableViewCell.h"
#import "UtilFunctions.h"
#import <RestKit/RestKit.h>
#import "CNPPopupController.h"

@interface StoryDetailViewController () <UITableViewDataSource, UITableViewDelegate, CNPPopupControllerDelegate>

@property (weak, nonatomic) IBOutlet UITableView *tableView;


@property (weak, nonatomic) IBOutlet UIButton *btnBack;
@property (weak, nonatomic) IBOutlet UIButton *btnDonate;

@property (weak, nonatomic) IBOutlet UIProgressView *progressView;

@property (weak, nonatomic) IBOutlet UIScrollView *scrollView;

@property (weak, nonatomic) IBOutlet UISegmentedControl *scDonateAmount;

@property (weak, nonatomic) IBOutlet UIImageView *ivIcon;
@property (weak, nonatomic) IBOutlet UILabel *lblTitle;
@property (weak, nonatomic) IBOutlet UILabel *lblDescription;
@property (weak, nonatomic) IBOutlet UILabel *lblStoryTitle;
@property (weak, nonatomic) IBOutlet UILabel *lblFundingProgress;
@property (weak, nonatomic) IBOutlet UILabel *lblDueDate;
@property (weak, nonatomic) IBOutlet UILabel *lblStory;

@property (nonatomic, strong) CNPPopupController *popupController;


@end

@implementation StoryDetailViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.tableView.delegate = self;
    self.tableView.dataSource = self;
    // Do any additional setup after loading the view.
    [self updateLabels];
}

-(void) updateLabels {
    Story *firstStory = [self.atRisk.stories firstObject];
    self.lblTitle.text = self.atRisk.fakeName;
    self.lblDescription.text = self.atRisk.desc;
    self.lblStoryTitle.text = firstStory.title;
    UIImage * image = [UtilFunctions findCorrespondingImageViewFrom:firstStory.title];
    self.ivIcon.image = image;
    self.lblFundingProgress.text = [NSString stringWithFormat:@"$%@/$%@", firstStory.amountRaised, firstStory.amountNeeded];
    self.lblStory.text = firstStory.text;
    self.progressView.progress = [firstStory.amountRaised floatValue]/[firstStory.amountNeeded floatValue];
}

- (void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];

    [self.tableView reloadData];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

-(UIView *)tableView:(UITableView *)tableView viewForHeaderInSection:(NSInteger)section {
    return nil;
}

-(NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return 1;
}

-(NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    NSInteger count = self.atRisk.stories.count - 1;
    if (count < 0) {
        return 0;
    } else {
        return count;
    }
    return count;
}

-(UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    StoryOverviewTableViewCell * cell = (StoryOverviewTableViewCell *) [tableView dequeueReusableCellWithIdentifier:@"StoryOverviewTableViewCell"];
    Story * story = [self.atRisk.stories objectAtIndex:indexPath.row+1];
    cell.lblTitle.text = story.title;
    UIImage * image = [UtilFunctions findCorrespondingImageViewFrom:story.title];
    cell.ivIcon.image = image;
    cell.lblAmount.text = [NSString stringWithFormat:@"$%@/$%@", story.amountRaised, story.amountNeeded];
    cell.lblDesc.text = story.text;
    cell.progressView.progress = [story.amountRaised floatValue]/[story.amountNeeded floatValue];
    return cell;
}

- (IBAction)btnBackPressed:(id)sender {
    [self.navigationController popViewControllerAnimated:YES];
}



- (IBAction)btnDonatePressed:(id)sender {
    NSString * amount = [self.scDonateAmount titleForSegmentAtIndex:self.scDonateAmount.selectedSegmentIndex];
    NSNumberFormatter *f = [[NSNumberFormatter alloc] init];
    f.numberStyle = NSNumberFormatterDecimalStyle;
    NSNumber *strippedAmount = [f numberFromString:[amount stringByReplacingOccurrencesOfString:@"$" withString:@""]];
    
    UIAlertController * alertController = [UIAlertController
                                           alertControllerWithTitle:@"Donate Confirmation"
                                           message:@"Please verify the amount you would like to donate."
                                           preferredStyle:UIAlertControllerStyleAlert];
    
    UIAlertAction *cancelAction = [UIAlertAction
                                   actionWithTitle:@"Cancel"
                                   style:UIAlertActionStyleCancel
                                   handler:^(UIAlertAction *action)
                                   {
                                       NSLog(@"Cancel action");
                                   }];
    
    UIAlertAction *okAction = [UIAlertAction
                               actionWithTitle:@"Send"
                               style:UIAlertActionStyleDefault
                               handler:^(UIAlertAction *action)
                               {
                                   NSLog(@"OK action");
                                   NSString *amount = [NSString stringWithFormat:@"$%@", alertController.textFields.firstObject.text];
                                   [self.scDonateAmount setTitle:amount forSegmentAtIndex:3];
                               }];
    
    [alertController addAction:cancelAction];
    [alertController addAction:okAction];
    [self presentViewController:alertController animated:YES completion:nil];
    
    NSDictionary *dict = @{@"amount": strippedAmount, @"_id": self.atRisk._id};
    [self postDonation:dict];
}

- (IBAction)scDonationAmountPressed:(id)sender {
    if (self.scDonateAmount.selectedSegmentIndex == 3) {
        UIAlertController * alertController = [UIAlertController
                                               alertControllerWithTitle:@"Donate Amount"
                                               message:@"Please specify the amount you would like to donate."
                                               preferredStyle:UIAlertControllerStyleAlert];
        
        [alertController addTextFieldWithConfigurationHandler:^(UITextField *textField)
         {
             textField.placeholder = @"Enter An Amount";
         }];
        UIAlertAction *cancelAction = [UIAlertAction
                                       actionWithTitle:@"Cancel"
                                       style:UIAlertActionStyleCancel
                                       handler:^(UIAlertAction *action)
                                       {
                                           NSLog(@"Cancel action");
                                       }];
        
        UIAlertAction *okAction = [UIAlertAction
                                   actionWithTitle:@"Set"
                                   style:UIAlertActionStyleDefault
                                   handler:^(UIAlertAction *action)
                                   {
                                       NSLog(@"OK action");
                                       NSString *amount = [NSString stringWithFormat:@"$%@", alertController.textFields.firstObject.text];
                                       [self.scDonateAmount setTitle:amount forSegmentAtIndex:3];
                                   }];
        
        [alertController addAction:cancelAction];
        [alertController addAction:okAction];
        [self presentViewController:alertController animated:YES completion:nil];
    }
}


-(void) postDonation:(NSDictionary *)dict {
    [[RKObjectManager sharedManager] getObjectsAtPath:@"/donate"
                                           parameters:dict
                                              success:^(RKObjectRequestOperation *operation, RKMappingResult *mappingResult) {
                                                  [self showPopupWithStyle:CNPPopupStyleCentered];
                                                  NSLog(@"success!");
                                              }
                                              failure:^(RKObjectRequestOperation *operation, NSError *error) {
                                                  NSLog(@"Posting failed': %@", error);
                                              }];
}


- (void)showPopupWithStyle:(CNPPopupStyle)popupStyle {
    
    NSMutableParagraphStyle *paragraphStyle = NSMutableParagraphStyle.new;
    paragraphStyle.lineBreakMode = NSLineBreakByWordWrapping;
    paragraphStyle.alignment = NSTextAlignmentCenter;
    
    NSAttributedString *title = [[NSAttributedString alloc] initWithString:@"Thanks!" attributes:@{NSFontAttributeName : [UIFont boldSystemFontOfSize:24], NSParagraphStyleAttributeName : paragraphStyle}];
    NSString *msg = [NSString stringWithFormat:@"%@ %@", @"Be sure to check back for updates on", self.atRisk.fakeName];
    NSAttributedString *lineOne = [[NSAttributedString alloc] initWithString:msg attributes:@{NSFontAttributeName : [UIFont systemFontOfSize:18], NSParagraphStyleAttributeName : paragraphStyle}];

    CNPPopupButton *button = [[CNPPopupButton alloc] initWithFrame:CGRectMake(0, 0, 200, 60)];
    [button setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
    button.titleLabel.font = [UIFont boldSystemFontOfSize:18];
    [button setTitle:@"Got It" forState:UIControlStateNormal];
    button.backgroundColor = [UIColor colorWithRed:47/255. green:119/255. blue:209/255. alpha:1.0];
    button.layer.cornerRadius = 4;
    button.selectionHandler = ^(CNPPopupButton *button){
        [self.popupController dismissPopupControllerAnimated:YES];
        NSLog(@"Block for button: %@", button.titleLabel.text);
    };
    
    UILabel *titleLabel = [[UILabel alloc] init];
    titleLabel.numberOfLines = 0;
    titleLabel.attributedText = title;
    
    UILabel *lineOneLabel = [[UILabel alloc] init];
    lineOneLabel.numberOfLines = 0;
    lineOneLabel.attributedText = lineOne;
    
    UIImageView *imageView = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"check"]];
    imageView.frame = CGRectMake(0, 0, 60, 60);
    
    UILabel *lineTwoLabel = [[UILabel alloc] init];
    lineTwoLabel.numberOfLines = 0;
    
    
    UITextField *textFied = [[UITextField alloc] initWithFrame:CGRectMake(10, 10, 230, 35)];
    textFied.borderStyle = UITextBorderStyleRoundedRect;

    self.popupController = [[CNPPopupController alloc] initWithContents:@[titleLabel, lineOneLabel, imageView, lineTwoLabel, button]];
    self.popupController.theme = [CNPPopupTheme defaultTheme];
    self.popupController.theme.popupStyle = popupStyle;
    self.popupController.delegate = self;
    [self.popupController presentPopupControllerAnimated:YES];
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
